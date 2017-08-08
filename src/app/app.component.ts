import { Component,OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 데이터값
  public pagingArray : Array<any> = [];
  // 페이지 네이션 값
  public showPagination = [];
  // 보여줄 게시글 모음
  public showItems = [];
  public settingPaginaion : any;
  ngOnInit (){

    // 기본 데이터 값 받아오기
    for(let i = 1 ; i <32 ;i++){
      let createItem = {id:i};
      this.pagingArray.push(createItem);
    }
    // 페이지네이션 설정
    this.setPage(1)
  }

  //페이지네이션을 실행할 함수
  setPage(page:number){
    // page값은 클릭한 번호와 같은 값
    this.settingPaginaion = this.showPages(this.pagingArray.length,page);
    // 보여줄 게시글들의 정보 처리
    // 서버쪽에서 반환하는 값이면 필요없음
    this.showItems = this.pagingArray.slice(this.settingPaginaion.itemStartIndex, this.settingPaginaion.itemEndIndex+1);
    // 페이지번호들의 배열 반환
    this.showPagination = this.settingPaginaion.pages;

  }
  // 페이지 네이션에 사용될 변수들을 계산하는 함수
  showPages(totalPageItems:number, nowPage:number = 1, pageLimit:number = 5, pagination:number = 5){
    /*
      1번째 인자 : 총페이지수,
      2번째 인자 : 현재페이지 : 기본값 1
      3번째 인자 : 보여줄 게시글 수 : 기본값 5
      4번째 인자 : 보여줄 게시글 번호 수 : 기본값 5
    */

    if(totalPageItems === undefined){
      return;
    }else{
      // 총페이지 구하기
      // 총 페이지 = 모든 게시글수 / 한 페이지에 보여줄 게시글수의 올림값
      let totalPages = Math.ceil(totalPageItems/pageLimit);

      // 페이지 네이션 인덱스 처리
      // 페이지 위치에 따라 보여줄 페이지네이션 처리하기

      let pageNationStart:number, pageNationEnd:number;

      //한번에 보여줄 페이지 번호보다 총 페이지 수가 같거나 작을경우
      //시작점은 1, 끝점은 총페이지 개수
      if(totalPages <= pagination){
        pageNationStart = 1;
        pageNationEnd = totalPages;
      }else{
        // 그외의 경우
        // 1. 현재페이지가 보여줄 페이지 번호의 중간값과 같거나 작을 경우
        // 시작점은 1, 끝점은 한번에 보여줄 페이지수
        if(nowPage <= Math.ceil(pagination/2)){
          pageNationStart = 1;
          pageNationEnd = pagination;
        }else if(nowPage + (pagination-1) >= totalPages){
          // 2. 현재 페이지 + 한번에 보여줄 페이지 -1 값이 끝페이지 보다 같거나 클 경우
          // 시작점은 현재 페이지 + 한번에 보여줄 페이지 -1 , 끝점은 총 페이지수
          pageNationStart = totalPages - (pagination-1);
          pageNationEnd = totalPages;
        }else{
          // 3.그 외의 경우에는 현재페이지가 보여줄 페이지 번호들의 중간값이므로
          // 시작점은 현재페이지 - 보여줄페이지/2의 버림값
          // 끝점은 현재페이지 + 보여줄페이지/2의 버림값
          pageNationStart = nowPage - Math.floor(pagination/2);
          pageNationEnd = nowPage + Math.floor(pagination/2);
        }
      }
      // 페이지 번호 값들이 들어간 배열 생성
      let pages = [];
      for(let pageIndex = pageNationStart ; pageIndex < pageNationEnd+1 ; pageIndex++){
        pages.push(pageIndex);
      }
      // 페이지 번호들을 담은 배열 생성

      // 보여줄 게시글들의 인덱스 계산
      // 시작 인덱스는 (현재페이지 - 1) * 보여줄 게시글의 수
      // 끝 인덱스는 (현재페이지 + 보여줄게시글 수 -1) 과 (총게시글수 -1)의 갯수중 작은값
      // 서버쪽에서 처리한다면, 필요없음
      let itemStartIndex = (nowPage -1 ) * pageLimit;
      let itemEndIndex = Math.min(itemStartIndex + pageLimit -1, totalPageItems - 1);

      // 계산된 모든 변수값을 반환하여 사용할 수 있게함
      return{
        totalPages:totalPages,
        nowPage:nowPage,
        pageLimit:pageLimit,
        pagination:pagination,
        pageNationStart:pageNationStart,
        pageNationEnd:pageNationEnd,
        pages:pages,
        itemStartIndex:itemStartIndex,
        itemEndIndex:itemEndIndex
      }
    }
  }
}

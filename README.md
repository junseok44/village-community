- [ ] signup logic
- [ ] login logic

* [ ] 좀 더 확장성있게는 안되려나..
      FIXME
      지금 문제는

1. 헤더 FETCH가 늦게 된다.
2. 헤더와 index에서 따로따로 fetch한다. 그래서.

게시판을 load하는데. 어떤 게시판을?

getServerSideProps에서. param을 받는다.

일단 index로 들어간다.
getServersideprops로 user정보를 받는다.
유저가 어떤 곳에 속해있는지 확인

로그인 안했을시 --> 어떤 마을에도 속해있지 않네요~ 404 페이지.

로그인 했을시 --> 유저가 속한 마을의 post를 보여준다. 어떻게?

유저의 cookie를 꺼낸다. -> 유저 정보를 전달.
그 유저가 해당되는 마을 id를 가지고 post들을 쿼리한다.

db에서 post데이터를 꺼내온다. 어떻게 쿼리하면 되냐면..
post에 id가 있을 것이다. 마을 id. 그거가지고 .

1. 포스트 스키마 생성.
2. postlist페이지 ui.

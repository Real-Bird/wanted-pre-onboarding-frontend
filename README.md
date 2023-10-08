# (개인 프로젝트) Wanted FE To Do List (2023.07~2023.08)

## 개요

- 원티드 프리온보딩 인턴십 프론트엔드 11차 선발 과제를 개선한 `To Do List` 사이트

## 배포

<https://wtd-fe-rb.netlify.app/>

> #### Demo ID & PWD
>
> ID : test-rb@wtd.fe\
> PWD : testwtdfe

## 사용 스택

- TypeScript, React, React Router, Redux Toolkit, Tailwind CSS, Vite, Vitest

## 주요 기능

### 혼재한 로직 분리

**도메인 로직 분리**

- 프로젝트 초기에 대중없이 작성하여 View와 도메인 로직이 혼재했습니다.
- `class` 문법 학습 후 기능별로 나누어 객체를 구성했습니다.
  - `fetch` 함수는 공용으로 사용하는 options를 인터셉트하여 요청하는 `HttpClient` 클래스로 만들었습니다.
  - 로그인/회원가입 도메인은 `AuthService`에서, ToDo 도메인은 `ToDoService`는 클래스 내에서 요청 로직을 구현하고 관리했습니다.
- View 컴포넌트에 전달할 상태와 함수들은 **각 도메인 담당 커스텀 훅**을 만들어 로직을 구현했습니다.

**View 컴포넌트 분리**

- 공용으로 사용하면서 도메인과 관련없는 디자인 시스템 컴포넌트 위주로 먼저 분리했습니다.
  - 특히, 이벤트 속성을 자주 사용하는 마크업은 각각의 속성 인터페이스를 상속하여 커스텀 컴포넌트로 구현했습니다.
    - `input - InputHTMLAttributes<HTMLInputElement>`, `button - ButtonHTMLAttributes<HTMLButtonElement>`
  - `Input` 컴포넌트는 `비제어 컴포넌트`로 사용할 수 있도록 `forwardRef`로 감쌌습니다.

### Redux Toolkit 적용

**`Context API`와 `useState`에서 `RTK`로**

- 이전에는 `context`에서 내려준 fetch 메서드를 호출하여 반환값을 커스텀 훅(`useFetch`)의 `useState`에 저장해 상태를 반환했습니다.
- 프로젝트 규모가 매우 작기에 상태 관리 라이브러리 선택은 합리적이지 않았지만 몇 가지 이유에서 `Redux` 적용을 선택했습니다.
  1. 상태 관리 라이브러리 학습의 필요성
  2. `context provider` 래핑을 신경 써야 하는 것과 로직을 두 번 거치는 불편함(`context->useFetch`) 제거
  3. 가장 대중적이며 역사 깊은 라이브러리

**`createAsyncThunk`를 이용한 비동기 통신**

- 데이터 패칭 시, 제가 만든 `useFetch` 커스텀 훅은 추가, 수정, 삭제 작업 후 `setState`로 일일이 반영했습니다.
- `RTK`를 적용하면서 `createAsyncThunk`를 사용해 CRUD 비동기 액션을 생성했습니다.
  - 상태 변화는 `extraReducers` 메서드에서 반영해 서비스 로직에서는 `dispatch`만 하도록 리팩토링했습니다.
  - `addMatcher`를 이용하여 `extraReducers`에서 반복적으로 사용되는 **로딩 상태** 코드를 하나의 묶음으로 줄여 가독성을 높였습니다.
- 서비스 훅에서 관리하던 상태를 도메인별 `reducer`로 관리함으로써 서비스 훅의 코드 가독성이 높아지고 상태 관리의 유지보수가 편해졌음을 느꼈습니다.

**공식 문서만 보고 라이브러리 적용**

- 스스로 익히고 적용하는 힘을 기르고자 강의, 서적, 검색에 최대한 의지하지 않고 공식 문서만 이용해 구현했습니다.
- [[RTK] 공식 문서만 보고 Redux Toolkit 적용해 보기(1)](https://velog.io/@real-bird/RTK-공식-문서만-보고-Redux-Toolkit-적용해-보기1)
- [[RTK] 공식 문서만 보고 Redux Toolkit 적용해 보기(2)](https://velog.io/@real-bird/RTK-공식-문서만-보고-Redux-Toolkit-적용해-보기2)

### 테스트 코드 작성

- 테스트 코드를 익힐 목적으로 모든 컴포넌트의 테스트 코드를 작성했습니다.
- 코드 변경이 일어난 경우 문제가 발생한 컴포넌트를 빠르게 보수하는 이점이 있음을 배웠습니다.
- 라이브러리는 `Jest`와 `Testing Library`를 이용했습니다.
  - `Vite`로 마이그레이션하면서 `Vitest`로 변경하였습니다.

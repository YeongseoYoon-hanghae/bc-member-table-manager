# 윤영서 - 비즈니스 캔버스 과제

<img width="1192" alt="image" src="https://github.com/user-attachments/assets/90139f58-015b-409e-a180-6d3cd54b1f5a" />

## 실행 방법

1. 프로젝트 클론

```bash
git clone https://github.com/YeongseoYoon-hanghae/bc-member-table-manager.git
```

2. 의존성 설치

```bash
pnpm install
```

3. .env 파일 추가

```
// 인메모리인 경우 in-memory, 로컬스토리지 사용을 원하는 경우 local-storage
VITE_STORAGE=키 값 설정 
```

4. 프로젝트 실행

```bash
pnpm dev
```

## 구현 화면 및 코드 작성

|회원 추가 모달|회원 수정 모달|회원 추가/수정 모달에서 글자수 유효성 검사 메시지|
|---|---|---|
|<img width="672" alt="image" src="https://github.com/user-attachments/assets/21dc5a97-e90f-4875-91f0-13f8a2890a17" />|<img width="613" alt="image" src="https://github.com/user-attachments/assets/59dfaee5-2d8c-4bdb-8db3-25f79f7ca605" />|<img width="615" alt="image" src="https://github.com/user-attachments/assets/4f7e366e-78b4-4f4f-9bbe-3222e208be90" />

회원 추가인지 수정인지에 따라 타이틀이 변경되도록 구현하였습니다.

### 추가된 데이터에 따라 필터 구현

<img width="360" alt="image" src="https://github.com/user-attachments/assets/171ac4af-e2d3-480c-ba1a-15938bf1d8d5" />

`generateFilters` 유틸을 구현하여 동적으로 필터가 값에 따라 결정되도록 구현하였습니다. 

<img width="311" alt="image" src="https://github.com/user-attachments/assets/0dd76c99-4e17-4b43-8209-df848c48a635" />

중복값이 있어도 필터링하여 하나의 필터로 보여집니다.

### 삭제 구현
https://github.com/user-attachments/assets/3db1f04b-78be-4cd2-b717-7c59dfe6f657

### 선택 삭제 구현

<img width="142" alt="image" src="https://github.com/user-attachments/assets/7e9ba4e5-1723-41b2-8be0-e34c56a802c6" />


Antd에서 위 사진의 Table 내부 Checkbox 구현시 `rowSelection`을 구현하기 위해서는
```ts
<Table<MemberData>
  rowSelection={{}}
/>
```
처럼 필드를 넣어주긴해야했는데, 빈 값을 넣어주어야한다는 것이 이질적으로 느껴져서 기능을 추가하였습니다. 체크된 row들을 삭제할 수 있는 기능입니다.

https://github.com/user-attachments/assets/8ce3153f-8773-49a6-b922-819e43a99ef9

### useLocalStorage 훅 및 useMemberStorage

로컬 스토리지를 사용함에 따라 외부 API인 로컬 스토리지를 리액트와 동기화하기 위해 `useExternalStore`를 사용한 `useLocalStorage`훅을 구현하였습니다. 동일한 탭 내에서도 로컬 스토리지 변경 사항을 감지하기 위해 커스텀 이벤트를 활용했습니다.

- 기본 'storage' 이벤트는 다른 탭에서 발생한 변경만 감지하므로, 커스텀 이벤트 'storage-inner-document'를 구현하여 같은 탭 내에서의 LocalStorage 변경도 감지하도록 했습니다.
- useLocalStorageObject 훅을 추가하여 객체를 JSON으로 직렬화/역직렬화하는 로직을 캡슐화했습니다.
- useSyncExternalStore를 사용하여 외부 상태 변경을 효율적으로 감지하고 동기화했습니다.

또한 이를 Member 비즈니스 로직으로 래핑한 `useMemberStorage`를 구현하였습니다.

`useMemberStorage`는 내부에서 env가 인메모리인지, 로컬스토리지인지를 확인하고 그에 따라 `useState`를 사용할지 `useLocalStorage`를 사용할지를 결정합니다.



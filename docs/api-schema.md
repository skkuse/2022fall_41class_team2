아래의 API Spec은 변동 가능성이 있습니다.

실제 동작하는 API는 Swagger 혹은 Redoc을 참고하시기 바랍니다.

| Component  | Method    | API                               | Function                |
| ---------- | --------- |-----------------------------------|-------------------------|
| Auth       | GET       | /auth/{user_id}/                  | 유저 세부 정보 조회             |
|            | GET, POST | /auth/github/callback/            | Github OAuth 로그인 요청 콜백  |
|            | POST      | /auth/refresh/                    | Access Token 재발급        |
| Lecture    | GET       | /lectures/                        | 모든 강의 목록 조회             |
|            | POST      | /lectures/                        | 신규 강의 등록                |
|            | GET       | /lectures/{lecture_id}/           | 강의 세부 정보 조회             |
|            | DELETE    | /lectures/{lecture_id}/           | 강의 삭제                   |
| Enrollment | GET       | /enrollments/                     | 유저의 모든 수강 정보 조회         |
|            | POST      | /enrollments/                     | 유저의 신규 수강 등록            |
|            | GET       | /enrollments/{enrollment_id}/     | 수강 정보 세부 조회             |
|            | DELETE    | /enrollments/{enrollment_id}/     | 수강 정보 삭제                |
| Assignment | GET       | /assignments/                     | 특정 강의의 모든 과제 정보 조회      |
|            | POST      | /assignments/                     | 특정 강의의 신규 과제 등록         |
|            | GET       | /assignments/{assignment_id}/     | 과제 세부 정보 조회             |
|            | DELETE    | /assignments/{assignment_id}/     | 과제 삭제                   |
| Testcase   | GET       | /testcases/                       | 특정 과제의 모든 공개 테스트 케이스 조회 |
|            | POST      | /testcases/                       | 특정 과제의 신규 테스트 케이스 등록    |
|            | GET       | /testcases/{testcase_id}/         | 공개 테스트 케이스 세부 정보 조회     |
|            | DELETE    | /testcases/{testcase_id}/         | 테스트 케이스 제거              |
| Repo       | GET       | /repos/                           | 특정 과제의 모든 과거 풀이 코드 조회   |
|            | POST      | /repos/                           | 특정 과제의 신규 풀이 코드 저장      |
|            | GET       | /repos/{repo_id}/                 | 과거 풀이 코드 세부 정보 조회       |
|            | PUT       | /repos/{repo_id}/                 | 풀이 코드 저장                |
|            | DELETE    | /repos/{repo_id}/                 | 풀이 코드 제거                |
| Output     | POST      | /outputs/exercises/               | 풀이 코드 실행 및 결과 전달        |
|            | POST      | /outputs/testcases/{testcase_id}/ | 테스트 케이스 결과 전달           |
|            | GET       | /outputs/results/                 | 모든 과제 제출 결과 조희          |
|            | POST      | /outputs/results/                 | 과제 제출                   |
|            | GET       | /outputs/results/{result_id}/     | 특정 과제 제출 결과 조회          |

## Auth

### GET /auth/{user_id}/

유저 세부 정보 조회

- Request: `auth (required)`

- Response: `user_id`, `created_at`, `last_login`, `nickname`, `name`, `email`, `profile_image_url`, `github_api_url`, `github_profile_url`

### GET, POST /auth/github/callback/

Github OAuth 로그인 요청 콜백

- Request: `code`

- Response: `user_id`, `access`, `refresh`

### POST /auth/refresh/

Acesss Token 재발급

- Request: `refresh`

- Response: `access`

## Lecture

### GET /lectures/

모든 강의 목록 조회

- Request: `auth (optional)`

- Response: `...`

### POST /lectures/

신규 강의 등록

요청을 보낸 유저가 Instructor로 등록됨

- Request: `auth (required)`, `name`

- Response: `lecture_id`, `name`, `{instructor}`, `is_instructor`, `is_student`

### GET /lectures/{lecture_id}/

강의 세부 정보 조회

요청자의 Auth가 포함되어 있다면 Instruct / Enroll 정보 포함 해야함

- Request: `auth (optional)`

- Response: `lecture_id`, `name`, `{instructor}`, `is_instructor`, `is_student`

### DELETE /lectures/{lecture_id}/

강의 삭제

요청자의 Auth가 강의 Instructor와 일치해야 함

관련 강의 과제, 테스트 케이스 등 하위 정보는 보존 (NOT Cascade)

- Request: `auth (required)`

- Response: None

## Enrollment

### GET /enrollments/

유저의 모든 수강 정보 조회

- Request: `auth (required)`

- Response: `...`

### POST /enrollments/

유저의 신규 수강 등록

- Request: `auth (required)`, `lecture_id`

- Response: `enrollment_id`, `created_at`

### GET /enrollments/{enrollment_id}/

수강 정보 세부 조회

- Request: `auth (required)`

- Response: `enrollment_id`, `created_at`

### DELETE /enrollments/{enrollment_id}/

수강 정보 삭제

관련 하위 정보는 보존 (NOT Cascade)

- Request: `auth (required)`

- Response: None

## Assignment

### GET /assignments/

특정 강의의 모든 과제 정보 조회

요청자의 Auth가 강의 Instructor와 일치하면 `answer_code` 필드도 함께 제공

- Request:  `auth (optional)`, `lecture_id`

- Response: `...`

### POST /assignments/

특정 강의의 신규 과제 등록

요청자의 Auth가 강의 Instructor와 일치해야 함

- Request: `auth (required)`, `lecture_id`, `deadline`, `question`, `constraints`, `[{language, skeleton_code, answer_code}]`

- Response: `assignment_id`, `name`, `deadline`, `question`, `constraints`, `[{language, skeleton_code, answer_code}]`, `[testcases]`

### GET /assignments/{assignment_id}/

과제 세부 정보 조회

요청자의 Auth가 강의 Instructor와 일치하면 `answer_code` 필드도 함께 제공

- Request: `auth (optional)`

- Response: `assignment_id`, `name`, `deadline`, `question`, `constraints`, `[{language, skeleton_code, answer_code}]`, `[testcases]`

### DELETE /assignments/{assignment_id}/

과제 삭제

요청자의 Auth가 강의 Instructor와 일치해야 함

관련 테스트 케이스 등 하위 정보도 삭제 (Cascade)

- Request: `auth (required)`

- Response: None

## Testcase

### GET /testcases/

특정 과제의 모든 공개 테스트 케이스 조회

요청자의 Auth가 강의 Instructor와 일치한다면 비공개 테스트 케이스도 조회

- Request: `auth (required)`, `assignment_id`

- Response: `...`

### POST /testcases/

특정 과제의 신규 테스트 케이스 등록

요청자의 Auth가 강의 Instructor와 일치해야 함

- Request: `auth (required)`, `assignment_id`, `input`, `output`, `hidden`

- Response: `testcase_id`, `created_at`, `input`, `output`, `is_hidden`

### GET /testcases/{testcase_id}/

공개 테스트 케이스 세부 정보 조회

요청자의 Auth가 강의 Instructor와 일치한다면 비공개 테스트 케이스도 조회

- Request: `auth (required)`

- Response: `testcase_id`, `created_at`, `input`, `output`, `is_hidden`

### DELETE /testcases/{testcase_id}/

테스트 케이스 제거

요청자의 Auth가 강의 Instructor와 일치해야 함

관련 하위 정보는 보존 (NOT Cascade)

- Request: `auth (required)`

- Response: None

## Repo

### GET /repos/

특정 과제의 모든 과거 풀이 코드 조회

- Request: `auth (required)`, `assignment_id`

- Response: `...`

### POST /repos/

특정 과제의 신규 풀이 코드 저장

해당 과제에 유저가 저장한 풀이 코드가 **3**개 이상이면, 요청 거부됨

- Request: `auth (required)`, `assignment_id`, `language`, `code`

- Response: `repo_id`, `created_at`, `modified_at`, {`language`, `code`}

### GET /repos/{repo_id}/

과거 풀이 코드 세부 정보 조회

- Request: `auth (required)`

- Response: `repo_id`, `created_at`, `modified_at`, {`language`, `code`}

### PUT /repos/{repo_id}/

풀이 코드 저장

- Request: `auth (required)`, `language`, `code`

- Response: `repo_id`, `created_at`, `modified_at`, {`language`, `code`}

### DELETE /repos/{repo_id}/

풀이 코드 제거

- Request: `auth (required)`

- Response: None

## Output

### POST /outputs/exercises/

풀이 코드 실행 및 결과 전달

- Request: `auth (required)`, `language`, `code`, `input`

- Response: `eixt_status`, `output`

### POST /outputs/testcases/{testcase_id}/

테스트 케이스 결과 전달

공개 테스트 케이스인 경우 실행 결과를 노출, 비공개인 경우 노출하지 않음

- Request: `auth (required)`, `language`, `code`

- Response: `input`, `is_error`, `expected_output`, `actual_output`, `is_pass`

### GET /outputs/results/

모든 과제 제출 결과 조회

- Request: `auth (required)`, `assignment_id`

- Response: `...`

### POST /outputs/results/

과제 제출

요청자의 과제 제출 횟수 제한 여부를 확인해야 함

우선적으로 풀이 코드를 저장 후 실행

제출 처리 후 해당 Repo는 변경 불가해야 함

- Request: `auth (required)`, `repo_id`, `language`, `code`

- Response: `answer_code`, `[references]`, `code_explain`, `{functionality_result}`, `{plagiarism_result}`, `{efficiency_result}`, `{readability_result}`

### GET /outputs/results/{result_id}/

과제 제출 결과 조회

- Request: `auth (required)`, `assignment_id`

- Response: `answer_code`, `[references]`, `code_explain`, `{functionality_result}`, `{plagiarism_result}`, `{efficiency_result}`, `{readability_result}`

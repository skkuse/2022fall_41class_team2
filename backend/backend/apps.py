import os
import sys

from django.apps import AppConfig


class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        super().ready()

        if os.environ.get('DJANGO_SETTINGS_MODULE') != 'backend.settings.prod':
            return
        if sys.argv[1] != 'runserver':
            return
        if os.environ.get('RUN_MAIN', None) == 'true':
            return

        from datetime import datetime, timezone
        from authentication.models import User
        from lecture.models import Lecture
        from assignment.models import Assignment
        from testcase.models import Testcase

        (instructor, _) = User.objects.get_or_create(
            oauth_id='oauth_000000',
            nickname='Super Instructor',
            name='Software Engineering Instructor',
            email='se2022f@skku.edu',
        )

        """
        First Lecture Instance
        """
        (lecture_algorithm, _) = Lecture.objects.get_or_create(
            instructor=instructor,
            name='Algorithm',
        )

        """
        First Assignment Instance
        """
        (assignment_dfs, _) = Assignment.objects.get_or_create(
            lecture=lecture_algorithm,
            name='양궁대회(DFS)',
            deadline=datetime(year=2022, month=12, day=13, tzinfo=timezone.utc),
            question='양궁대회가 열렸다.\n승호는 저번 양궁대회 우승자이고 이번 대회에도 결승전까지 올라왔다. 결승전 상대는 영준이다.\n양궁대회 운영위원회는 한 선수의 연속 우승보다는 다양한 '
                     '선수들이 양궁대회에서 우승하기를 원한다. 따라서, 양궁대회 운영위원회는 결승전 규칙을 전 대회 우승자인 승호에게 불리하게 다음과 같이 정했다.\n\n영준이가 화살 n발을 '
                     '다 쏜 후에 승호가 화살 n발을 쏜다.\n점수를 계산한다.\n과녁판은 가장 작은 원의 과녁 점수는 10점이고 가장 큰 원의 바깥쪽은 과녁 점수가 0점이며, '
                     '0점부터 안쪽으로 들어갈수록 1점씩 증가한다.\n만약, k(k는 1~10사이의 자연수)점을 영준이가 a발을 맞혔고 승호가 b발을 맞혔을 경우 더 많은 화살을 k점에 맞힌 '
                     '선수가 k 점을 가져간다. 단, a = b일 경우는 영준이가 k점을 가져간다. k점을 여러 발 맞혀도 k점 보다 많은 점수를 가져가는 게 아니고 k점만 가져가는 것에 '
                     '유의해야 한다. 또한 a = b = 0 인 경우, 즉, 승호와 영준 모두 k점에 단 하나의 화살도 맞히지 못한 경우는 어느 누구도 k점을 가져가지 않는다.\n예를 들어, '
                     '영준이가 10점을 2발 맞혔고 승호도 10점을 2발 맞혔을 경우 영준이가 10점을 가져간다.\n다른 예로, 영준이가 10점을 0발 맞혔고 승호가 10점을 2발 맞혔을 경우 '
                     '승호가 10점을 가져간다.\n모든 과녁 점수에 대하여 각 선수의 최종 점수를 계산한다.\n최종 점수가 더 높은 선수를 우승자로 결정한다. 단, 최종 점수가 같을 경우 '
                     '영준이를 우승자로 결정한다.\n현재 상황은 영준이가 화살 n발을 다 쏜 후이고 승호가 화살을 쏠 차례이다.\n승호는 영준이를 가장 큰 점수 차이로 이기기 위해서 n발의 '
                     '화살을 어떤 과녁 점수에 맞혀야 하는지를 구하려고 한다.\n\n화살의 개수를 담은 자연수 n, 영준이가 맞힌 과녁 점수의 개수를 10점부터 0점까지 순서대로 담은 정수 '
                     '배열 info가 매개변수로 주어진다. 이때, 승호가 가장 큰 점수 차이로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지를 10점부터 0점까지 순서대로 정수 '
                     '배열에 담아 출력 하도록 solution 함수를 완성하시오. 만약, 승호가 우승할 수 없는 경우(무조건 지거나 비기는 경우)는 [-1]을 출력 해야 한다.\n',
            constraints='1 ≤ n ≤ 10\ninfo의 길이 = 11\n    0 ≤ info의 원소 ≤ n\n    info의 원소 총합 = n\n    info의 i번째 원소는 과녁의 '
                        '10 - i 점을 맞힌 화살 개수이다. (i는 0~10 사이의 정수이다.)\n승호가 우승할 방법이 있는 경우, 출력 할 정수 배열의 길이는 11이다.\n    0 ≤ '
                        '출력할 정수 배열의 원소 ≤ n\n    출력할 정수 배열의 원소 총합 = n (꼭 n발을 다 쏴야 한다.)\n    출력할 정수 배열의 i번째 원소는 과녁의 10 '
                        '- i 점을 맞힌 화살 개수이다. (i는 0~10 사이의 정수이다.)\n    승호가 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우, '
                        '가장 낮은 점수를 더 많이 맞힌 경우를 출력하시오.\n        가장 낮은 점수를 맞힌 개수가 같을 경우 계속해서 그다음으로 낮은 점수를 더 많이 맞힌 경우를 '
                        '출력하시오.\n        예를 들어, [2,3,1,0,0,0,0,1,3,0,0]과 [2,1,0,2,0,0,0,2,3,0,0]를 비교하면 [2,1,0,2,0,0,'
                        '0,2,3,0,0]를 출력 해야 한다.\n        다른 예로, [0,0,2,3,4,1,0,0,0,0,0]과 [9,0,0,0,0,0,0,0,1,0,'
                        '0]를 비교하면[9,0,0,0,0,0,0,0,1,0,0]를 출력 해야 한다.\n승호가 우승할 방법이 없는 경우, 출력 할 정수 배열의 길이는 1입니다.\n    '
                        '승호가 어떻게 화살을 쏘든 승호의 점수가 영준이의 점수보다 낮거나 같으면 [-1]을 출력 해야 한다.\n',
            contents=[
                {
                    'language': 'c',
                    'skeleton_code': '''
        #include <stdio.h>

        void solution() {

        }
        ''',
                    'answer_code': '''
        #include <malloc.h>
        #include <stdbool.h>
        #include <stdio.h>
        #include <stdlib.h>
        #include <string.h>

        int N;
        int peach_scores[11], lion_scores[11];
        int ans[11];
        int max_diff = -1;

        void dfs(int idx, int remain) {
            if (idx == 11) {
                int lion = 0, peach = 0;
                for (int i = 0; i < 10; i++) {
                    if (lion_scores[i] > peach_scores[i])
                        lion += 10 - i;
                    else if (lion_scores[i] < peach_scores[i])
                        peach += 10 - i;
                }

                if (lion > peach) {
                    int diff = lion - peach;
                    if (diff > max_diff) {
                        max_diff = diff;
                        memcpy(ans, lion_scores, sizeof(lion_scores));
                    }
                    else if (diff == max_diff) {
                        for (int i = 10; i >= 0; i--) {
                            if (ans[i] > lion_scores[i]) break;
                            if (lion_scores[i] > ans[i]) {
                                memcpy(ans, lion_scores, sizeof(lion_scores));
                                break;
                            }
                        }
                    }
                }
                return;
            }

            if (remain >= peach_scores[idx] + 1) {
                lion_scores[idx] = peach_scores[idx] + 1;
                dfs(idx + 1, remain - (peach_scores[idx] + 1));
            }
            lion_scores[idx] = idx == 10 ? remain : 0;
            dfs(idx + 1, idx == 10 ? 0 : remain);
        }

        void solution() {
            int n = 0, info[11];
            int* answer;

            scanf("%d", &n);
            for (int i = 0; i < 11; i++)
                scanf("%d", &info[i]);

            N = n;
            for (int i = 0; i < 11; i++)
                peach_scores[i] = info[i];

            dfs(0, N);

            printf("[");

            if (max_diff == -1) {
                answer = (int*)malloc(sizeof(int));
                answer[0] = -1;

                printf("%d", answer[0]);
            }
            else {
                answer = (int*)malloc(sizeof(int) * 11);
                memcpy(answer, ans, sizeof(ans));

                for (int i = 0; i < 11; i++) {
                    printf("%d", answer[i]);
                    if (i != 10)
                        printf(", ");
                }
            }

            printf("]");
        }
        ''',
                },
                {
                    'language': 'cpp',
                    'skeleton_code': '''
        #include <iostream>

        void solution() {

        }
        ''',
                    'answer_code': '''
        #include<iostream>
        #include<vector>
        using namespace std;

        int N;
        vector<int> apeach;
        vector<int> lion;
        vector<int> maxRes;
        int maxDiff = 0;

        void dfs(int dpt, int asc, int lsc, int n) {
            if (dpt == 11) {
                if (lsc <= asc) return;
                lion[10] += N - n;
                if (lsc - asc > maxDiff) {
                    maxRes = lion;
                    maxDiff = lsc - asc;
                }
                else if (lsc - asc == maxDiff) {
                    for (int i = 10; i >= 0; i--) {
                        if (lion[i] == maxRes[i]) continue;
                        else {
                            if (lion[i] > maxRes[i]) {
                                maxRes = lion;
                            }
                            break;
                        }
                    }
                }
                return;
            }

            int next = apeach[dpt] + 1;
            if (next + n <= N) {
                int nasc = asc;
                int nlsc = lsc + 10 - dpt;
                if (next != 1) nasc -= (10 - dpt);
                lion.push_back(next);
                dfs(dpt + 1, nasc, nlsc, next + n);
                lion.pop_back();
            }

            lion.push_back(0);
            dfs(dpt + 1, asc, lsc, n);
            lion.pop_back();
        }

        void solution() {
            int n = 0;
            vector<int> info, answer;

            cin >> n;
            for (int i = 0; i < 11; i++) {
                int temp;
                cin >> temp;
                info.push_back(temp);
            }

            N = n;
            apeach = info;

            int total = 0;
            for (int i = 0; i < info.size(); i++) {
                if (info[i]) {
                    total += (10 - i);
                }
            }

            dfs(0, total, 0, 0);

            if (maxDiff == 0) maxRes.push_back(-1);

            cout << "[";
            for (int i = 0; i < maxRes.size(); i++) {
                cout << maxRes[i];
                if (i != maxRes.size() - 1)
                    cout << ", ";
            }
            cout << "]";
        }
        ''',
                },
                {
                    'language': 'javascript',
                    'skeleton_code': '''
        let solution = () => {

        }
        ''',
                    'answer_code': '''
        const fs = require('fs');
        let input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');

        [n, arr] = input;
        n = Number(n);
        info = arr.split(' ').map(Number);

        let solution = () => {
            let max = 0;
            let answer = [-1];
            let lion = Array(11).fill(0);

            function DFS(level,count){
                if(level == 10){
                    lion[level] = count;
                    let sum = 0
                    for (let i = 0; i < 10; i++) {
                        if(lion[i] > info[i]){
                            sum = sum + (10 - i);
                        }else if(lion[i] === info[i]){
                            continue;
                        }else{
                            sum = sum - (10 - i);
                        }
                    }

                    if(sum > max){
                        max = sum;
                        answer = [...lion];
                    }else if(sum == max){
                        for (let j = 10; j > 0; j--) {
                            if(answer[j] == lion[j]){
                                continue;
                            }else if(lion[j] > answer[j]){
                                answer = [...lion];
                                break;
                            }else{
                                break;
                            }
                        }
                    }
                }else{
                    if(count == 0 || count < info[level] + 1 ){
                        DFS(level+1,count);
                    }else{
                        lion[level] = info[level] + 1
                        count = count - (info[level] + 1);
                        DFS(level+1,count)

                        lion[level] = 0
                        count = count + (info[level] + 1);
                        DFS(level+1,count)
                    }
                }
            }

            DFS(0,n)

            let output = answer.join(', ');
            console.log(`[${output}]`);
        }
        ''',
                },
                {
                    'language': 'python',
                    'skeleton_code': '''
        def solution():

        ''',
                    'answer_code': '''
        def solution():
            n = int(input())
            info = [*map(int, input().split())]

            global answer, result

            def score(ryan):
                s = 0
                for i in range(11):
                    if ryan[i] == info[i] == 0:
                        continue
                    if ryan[i] > info[i]:
                        s += 10 - i
                    else:
                        s -= 10 - i
                return s

            def dfs(idx, left, ryan):
                global answer, result
                if idx == -1 and left:
                    return
                if left == 0:
                    s = score(ryan)
                    if result < s:
                        answer = ryan[:]
                        result = s
                    return
                for i in range(left, -1, -1):
                    ryan[idx] = i
                    dfs(idx-1, left-i, ryan)
                    ryan[idx] = 0

            answer = [0 for _ in range(11)]
            result = 0
            dfs(10, n, [0 for _ in range(11)])

            print(answer if result != 0 else [-1])
        ''',
                },
            ],
            references=[
                'https://ko.wikipedia.org/wiki/%EA%B9%8A%EC%9D%B4_%EC%9A%B0%EC%84%A0_%ED%83%90%EC%83%89',
                'https://namu.wiki/w/%EA%B9%8A%EC%9D%B4%20%EC%9A%B0%EC%84%A0%20%ED%83%90%EC%83%89',
                'https://gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html',
                'https://youtu.be/zaBhtODEL0w',
            ],
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dfs,
            is_hidden=True,
            input='10\n0 0 0 0 0 0 0 0 3 4 3',
            output='[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2]',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dfs,
            is_hidden=True,
            input='9\n0 0 1 2 0 1 1 1 1 1 1',
            output='[1, 1, 2, 0, 1, 2, 2, 0, 0, 0, 0]',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dfs,
            is_hidden=False,
            input='1\n1 0 0 0 0 0 0 0 0 0 0',
            output='-1',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dfs,
            is_hidden=False,
            input='5\n2 1 1 1 0 0 0 0 0 0 0',
            output='[0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0]',
        )

        """
        Second Assignment Instance
        """
        (assignment_dp, _) = Assignment.objects.get_or_create(
            lecture=lecture_algorithm,
            name='정수 삼각형(DP)',
            deadline=datetime(year=2022, month=12, day=1, tzinfo=timezone.utc),
            question='7\n   3 8\n  8 1 0\n 2 7 4 4\n4 5 2 6 5\n\n위와 같은 삼각형의 꼭대기에서 바닥까지 이어지는 경로 중, 거쳐간 숫자의 합이 가장 큰 경우를 '
                     '찾아보려고 한다. 아래 칸으로 이동할 때는 대각선 방향으로 한 칸 오른쪽 또는 왼쪽으로만 이동 가능하다. 예를 들어 3에서는 그 아래칸의 8 또는 1로만 이동이 '
                     '가능하다.\n\n삼각형의 높이 n과 삼각형의 정보가 담긴 배열 triangle이 입력으로 주어질 때, 거쳐간 숫자의 최댓값을 출력하도록 solution 함수를 완성하시오.',
            constraints='삼각형의 높이는 1 이상 500 이하이다.\n삼각형을 이루고 있는 숫자는 0 이상 9,999 이하의 정수이다.',
            contents=[
                {
                    'language': 'c',
                    'skeleton_code': '''
        #include <stdio.h>

        void solution() {

        }
        ''',
                    'answer_code': '''
        #include <stdio.h>

        int dp[501][501];

        int Max(int a, int b) {
            return a > b ? a : b;
        }

        void solution() {
            int n;
            scanf("%d", &n);

            int i, j;
            for (i = 1; i <= n; i++)
                for (j = 1; j <= i; j++)
                    scanf("%d", &dp[i][j]);

            int max = -99999999;
            for (i = 1; i <= n; i++) {
                for (j = 1; j <= i; j++) {
                    if (j == 1)
                        dp[i][j] += dp[i - 1][j];
                    else if (i == j)
                        dp[i][j] += dp[i - 1][j - 1];
                    else
                        dp[i][j] = Max(dp[i - 1][j], dp[i - 1][j - 1]) + dp[i][j];
                    if (max < dp[i][j])
                        max = dp[i][j];
                }
            }

            printf("%d", max);
        }
        ''',
                },
                {
                    'language': 'cpp',
                    'skeleton_code': '''
        #include <iostream>

        void solution() {

        }
        ''',
                    'answer_code': '''
        #include <string>
        #include <vector>
        #include <algorithm>
        #include <iostream>
        using namespace std;

        void solution() {
            int n = 0;
            vector<vector<int>> triangle;
            cin >> n;

            for (int i = 0; i < n; i++) {
                vector <int> raw;
                for (int j = 0; j < i + 1; j++) {
                    int temp;
                    cin >> temp;
                    raw.push_back(temp);
                }
                triangle.push_back(raw);
            }

            int answer = 0;

            vector<vector<int>> dp(triangle.size());
            for(int i = 0 ; i < triangle.size(); i++){
                dp[i].resize(triangle[i].size());
            }

            dp[0][0] = triangle[0][0];

            for(int i = 0; i < triangle.size() - 1; i++){
                for(int j = 0; j < triangle[i].size(); j++){
                    dp[i + 1][j] = max(dp[i + 1][j], dp[i][j] + triangle[i+ 1][j]);
                    dp[i + 1][j + 1] = max(dp[i + 1][j + 1], dp[i][j] + triangle[i+ 1][j + 1]);
                }
            }

            int max_val = 0;
            int N = triangle.size() - 1;
            for(int j = 0; j < triangle[N].size(); j++){
                max_val = max(max_val, dp[N][j]);
            }

            answer = max_val;
            cout << answer;
        }
        ''',
                },
                {
                    'language': 'javascript',
                    'skeleton_code': '''
        let solution = () => {

        }
        ''',
                    'answer_code': '''
        const fs = require('fs');
        let input = fs.readFileSync('/dev/stdin').toString().trim().split('\\n');

        [n, ...arr] = input;
        n = Number(n);
        triangle = arr.map(i => i.split(\' \').map(i => Number(i)));

        let solution = () => {
            const dp = triangle.slice();

            for(let i = dp.length-2; i >= 0; i--) {
              for(let j = 0; j < dp[i].length; j++) {
                dp[i][j] += Math.max(dp[i+1][j], dp[i+1][j+1]);
              }
            }

            console.log(dp[0][0]);
        }
        ''',
                },
                {
                    'language': 'python',
                    'skeleton_code': '''
        def solution():

        ''',
                    'answer_code': '''
        def solution():
            n = int(input())

            triangle = []
            for i in range(n):
                string = [*map(int, input().split())]
                triangle.append(string)

            dp = []
            for t in range(1, len(triangle)):
                for i in range(t+1):
                    if i == 0:
                        triangle[t][0] += triangle[t-1][0]
                    elif i == t:
                        triangle[t][-1] += triangle[t-1][-1]
                    else:
                        triangle[t][i] += max(triangle[t-1][i-1], triangle[t-1][i])

            print(max(triangle[-1]))
        ''',
                },
            ],
            references=[
                'https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%EA%B3%84%ED%9A%8D%EB%B2%95',
                'https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95',
                'https://hongjw1938.tistory.com/47',
                'https://youtu.be/P8Xa2BitN3I',
            ],
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dp,
            is_hidden=False,
            input='5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5',
            output='30',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dp,
            is_hidden=True,
            input='6\n4\n1 6\n2 6 4\n10 12 8 6\n101 99 103 97 100\n1 2 3 2 1 2',
            output='134',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dp,
            is_hidden=False,
            input='4\n1\n2 3\n4 5 6\n7 8 9 10',
            output='20',
        )
        Testcase.objects.get_or_create(
            assignment=assignment_dp,
            is_hidden=True,
            input='6\n100\n99 98\n97 95 96\n94 93 91 92\n87 90 88 89 86\n80 81 82 83 84 85',
            output='562',
        )

        """
        Second Lecture Instance
        """
        Lecture.objects.get_or_create(
            instructor=instructor,
            name='Problem Solving',
        )

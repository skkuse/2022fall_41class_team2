import os

from django.test import TestCase
from output.utils_execution import setup_input, run
from backend.settings.base import BASE_DIR

SERVER_CODE_DIR = str(BASE_DIR) + os.environ['SERVER_CODE_DIR']


class Test(TestCase):

    def test_setup_input_without_white_spaces(self):
        raw = '''1
2 3
'''
        refined = setup_input(raw)

        self.assertTrue(refined[0] == '1')
        self.assertTrue(refined[-1] == '3')

    def test_setup_input_with_white_spaces(self):
        raw = '''


1
2
3   

'''
        refined = setup_input(raw)

        self.assertTrue(refined[0] == '1')
        self.assertTrue(refined[-1] == '3')

    def test_run_unsupported_language(self):
        with self.assertRaises(Exception):
            language = 'golang'
            run(SERVER_CODE_DIR, language, '', '')

    def test_run_when_timeout(self):
        raw_code = '''
import time

def solution():
    time.sleep(15)
'''
        raw_input = '''
3
'''

        response = run(SERVER_CODE_DIR, 'python', raw_code, raw_input)

        self.assertNotEqual(response.get('exit_status'), 0)

    def test_run_python(self):
        raw_code = '''
def solution():
    size = int(input())
    nums = [float(e) for e in input().split()]

    ret = 0
    for num in nums:
        ret += num

    print(ret)
    return ret
'''
        raw_input = '''
4
1 2.1 3.1 4
'''
        response = run(SERVER_CODE_DIR, 'python', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '10.2')

    def test_run_javascript(self):
        raw_code = '''
const fs = require("fs");
const stdin = fs.readFileSync("/dev/stdin").toString().split("\\n");

const input = (() => {
    let line = 0;
    return () => stdin[line++];
})();

let solution = () => {
    const size = input();

    let ret = 0;
    let nums = input().split(\' \').forEach((val) => {
        ret += Number(val);
    });

    console.log(ret);
    return ret;
}
'''
        raw_input = '''
4
1 2.1 3.1 4
'''
        response = run(SERVER_CODE_DIR, 'javascript', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '10.2')

    def test_run_c(self):
        raw_code = '''
#include <stdio.h>

void solution() {
    int size = 0;
    scanf(\"%d\", &size);

    float ret = 0;
    while (size--) {
        float num = 0;
        scanf(\"%f\", &num);
        ret += num;
    }

    printf(\"%.1f\\n\", ret);
}
'''
        raw_input = '''
4
1 2.1 3.1 4
'''
        response = run(SERVER_CODE_DIR, 'c', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '10.2')

    def test_run_cpp(self):
        raw_code = '''
#include <iostream>

using namespace std;

void solution() {
    int size = 0;
    cin >> size;

    float ret = 0;
    while (size--) {
        float num = 0;
        cin >> num;
        ret += num;
    }

    cout << ret << \'\\n\';
}
'''
        raw_input = '''
4
1 2.1 3.1 4
'''
        response = run(SERVER_CODE_DIR, 'cpp', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '10.2')

    def test_run_c_with_dfs_example(self):
        raw_code = '''
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
'''
        raw_input = '''
10\n0 0 0 0 0 0 0 0 3 4 3
'''

        response = run(SERVER_CODE_DIR, 'c', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2]')

    def test_run_cpp_with_dfs_example(self):
        raw_code = '''
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
'''
        raw_input = '''
10\n0 0 0 0 0 0 0 0 3 4 3
'''

        response = run(SERVER_CODE_DIR, 'cpp', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2]')

    def test_run_javascript_with_dfs_example(self):
        raw_code = '''
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
'''
        raw_input = '''
10\n0 0 0 0 0 0 0 0 3 4 3
'''

        response = run(SERVER_CODE_DIR, 'javascript', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2]')

    def test_run_python_with_dfs_example(self):
        raw_code = '''
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
'''
        raw_input = '''
10\n0 0 0 0 0 0 0 0 3 4 3
'''

        response = run(SERVER_CODE_DIR, 'python', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2]')

    def test_run_c_with_dp_example(self):
        raw_code = '''
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
'''
        raw_input = '''
5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5
'''

        response = run(SERVER_CODE_DIR, 'c', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '30')

    def test_run_cpp_with_dp_example(self):
        raw_code = '''
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
'''
        raw_input = '''
5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5
'''

        response = run(SERVER_CODE_DIR, 'cpp', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '30')

    def test_run_javascript_with_dp_example(self):
        raw_code = '''
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
'''
        raw_input = '''
5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5
'''

        response = run(SERVER_CODE_DIR, 'javascript', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '30')

    def test_run_python_with_dp_example(self):
        raw_code = '''
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
'''
        raw_input = '''
5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5
'''

        response = run(SERVER_CODE_DIR, 'python', raw_code, raw_input)

        self.assertEqual(response.get('exit_status'), 0)
        self.assertEqual(response.get('output'), '30')

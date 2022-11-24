from datetime import datetime, timezone
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment

# assignment fields
name = 'assignment name here'
deadline = datetime(year=2022, month=12, day=31, tzinfo=timezone.utc)
question = "what's 9 + 10"
constraints = 'what be my constraints'
contents = [{
    'language': 'python',
    'skeleton_code': '''
def solution():
    return 0
''',
    'answer_code': '''
def solution():
    return 9 + 10
''',
}]


class TestAssignment(TestCase):

    def test_assignment_save(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture_name = 'dummy-lecture-name'
        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor,
        )

        assignment = Assignment.objects.create(
            lecture=lecture,
            name=name,
            deadline=deadline,
            question=question,
            constraints=constraints,
            contents=contents,
        )

        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.contents[0].get('language'), contents[0].get('language'))
        self.assertEqual(assignment.contents[0].get('skeleton_code'), contents[0].get('skeleton_code'))
        self.assertEqual(assignment.contents[0].get('answer_code'), contents[0].get('answer_code'))

    def test_assignment_save_with_very_long_question_and_constraints(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture_name = 'dummy-lecture-name'
        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor,
        )
        another_question = '''
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
 
 
 
 Example 1:
 
 Input: nums = [2,7,11,15], target = 9
 Output: [0,1]
 Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 
 Example 2:
 
 Input: nums = [3,2,4], target = 6
 Output: [1,2]
 
 Example 3:
 
 Input: nums = [3,3], target = 6
 Output: [0,1]
  
  
  
'''
        another_constraints = '''
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
'''

        assignment = Assignment.objects.create(
            lecture=lecture,
            name=name,
            deadline=deadline,
            question=another_question,
            constraints=another_constraints,
            contents=contents,
        )

        self.assertIsNotNone(assignment.id)

    def test_assignment_save_with_very_long_answer_code_field(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture_name = 'dummy-lecture-name'
        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor,
        )
        another_name = 'another assignment name here'
        another_answer_code = '''
from collections import defaultdict

def dfs(edges, n, d, f, time):
    if n in d:
        return
    time[0] += 1
    d[n] = time[0]
    for to in edges[n]:
        dfs(edges, to, d, f, time)
    time[0] += 1
    f[n] = time[0]

N = int(input())

edges = defaultdict(list)

for _ in range(N):
    l = list(map(int, input().split()))
    fr = l[0]
    degree = l[1]
    edges[fr] = l[2:]

d = {} # discover time                                                                                                                                                                                      
f = {} # finish time                                                                                                                                                                                        

time = [0]
for n in range(1, N+1):
    dfs(edges, n, d, f, time)

for n in range(1, N+1):
    print('%d %d %d' % (n, d[n], f[n]))

def depth_search(i, adj, d, f, t):
    if d[i - 1]:
        return t
    d[i - 1] = t
    t += 1
    for v in adj[i - 1]:
        t = depth_search(v, adj, d, f, t)
    f[i - 1] = t
    t += 1
    return t
n = int(input())
adj = [list(map(int, input().split()))[2:] for _ in range(n)]

d = [0] * n
f = [0] * n

t = 1
for i in range(n):
    if d[i] == 0:
        t = depth_search(i + 1, adj, d, f, t)

for i, df in enumerate(zip(d, f)):
    print(i + 1, *df)   

import sys
sys.setrecursionlimit(10**6)

n = int(input())
graph = []
chart = [[int(i)] for i in range(1,n+1)]
for i in range(n):
    z = [c-1 for c in list(map(int,input().split()))][2:]
    graph.append(z)
time = 0

def dfs(nod):
    global graph
    global time
    #break condition
    if len(chart[nod]) != 1:
        return 
    #end condition not necessary
    #if not graph[nod]:
    #    time += 1
    #    chart[nod].append(time)
    #    return
    # command
    time += 1
    chart[nod].append(time)
    
    # move
    for dis in graph[nod]:
            dfs(dis)

    # post-command
    time += 1
    chart[nod].append(time)
for i in range(n):
    dfs(i)
for i in range(n):
    print(*chart[i])

import sys
sys.setrecursionlimit(10**6)

n = int(input())
graph = []
chart = [[int(i)] for i in range(1,n+1)]
for i in range(n):
    z = [c-1 for c in list(map(int,input().split()))][2:]
    graph.append(z)
time = 0

def dfs(nod):
    global graph
    global time
    #break condition
    if len(chart[nod]) != 1:
        return 
    #end condition not necessary
    #if not graph[nod]:
    #    time += 1
    #    chart[nod].append(time)
    #    return
    # command
    time += 1
    chart[nod].append(time)
    
    # move
    for dis in graph[nod]:
            dfs(dis)

    # post-command
    time += 1
    chart[nod].append(time)
for i in range(n):
    dfs(i)
for i in range(n):
    print(*chart[i])

import sys
sys.setrecursionlimit(10**6)

n = int(input())
graph = []
chart = [[int(i)] for i in range(1,n+1)]
for i in range(n):
    z = [c-1 for c in list(map(int,input().split()))][2:]
    graph.append(z)
time = 0

def dfs(nod):
    global graph
    global time
    #break condition
    if len(chart[nod]) != 1:
        return 
    #end condition not necessary
    #if not graph[nod]:
    #    time += 1
    #    chart[nod].append(time)
    #    return
    # command
    time += 1
    chart[nod].append(time)
    
    # move
    for dis in graph[nod]:
            dfs(dis)

    # post-command
    time += 1
    chart[nod].append(time)
for i in range(n):
    dfs(i)
for i in range(n):
    print(*chart[i])

'''

        assignment = Assignment.objects.create(
            lecture=lecture,
            name=another_name,
            deadline=deadline,
            question=question,
            constraints=constraints,
            contents=[{
                'language': 'python',
                'skeleton_code': contents[0].get('skeleton_code'),
                'answer_code': another_answer_code,
            }],
        )

        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.contents[0].get('answer_code'), another_answer_code)

    def test_assignment_save_with_empty_name(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture = Lecture.objects.create(
            name='dummy-lecture-name',
            instructor=instructor,
        )

        assignment = Assignment.objects.create(
            lecture=lecture,
            deadline=deadline,
            question=question,
            constraints=constraints,
            contents=contents,
        )

        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.name, '')

    def test_assignment_remove(self):
        instructor = User.objects.create(
            nickname='mock-instructor-nickname',
            oauth_id='mock-oauth-id',
        )
        lecture_name = 'dummy-lecture-name'
        lecture = Lecture.objects.create(
            name=lecture_name,
            instructor=instructor,
        )
        assignment = Assignment.objects.create(
            lecture=lecture,
            name=name,
            deadline=deadline,
            question=question,
            constraints=constraints,
            contents=contents,
        )

        result = assignment.delete()
        is_lecture_dead = Lecture.objects.get(name=lecture_name)

        self.assertEqual(result[1].get('id'), assignment.id)
        self.assertIsNotNone(is_lecture_dead)

from datetime import datetime
from django.test import TestCase
from authentication.models import User
from lecture.models import Lecture
from assignment.models import Assignment

#assignment fields
name = 'assignment name here'
deadline = datetime(year=2022, month=12, day=31)
question = "what's 9 + 10"
constraints = 'what be my constraints'
skeleton_code = '''
def solution():
return 0
'''
answer_code = '''
def solution():
return 9 + 10
'''
class TestLecture(TestCase):
    mock_instructor_email = 'mock-instructor@email.com'
    
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
            skeleton_code=skeleton_code,
            answer_code=answer_code,
        )

        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.skeleton_code, skeleton_code)
        self.assertEqual(assignment.answer_code, answer_code)

    # todo
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
        name = 'assignment name here'
        deadline = datetime(year=2022, month=12, day=31)
        question = "what's 9 + 10"
        constraints = 'what be my constraints'
        skeleton_code = '''
        def solution():
            return 0
        '''
        answer_code = '''
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
            name=name,
            deadline=deadline,
            question=question,
            constraints=constraints,
            skeleton_code=skeleton_code,
            answer_code=answer_code,
        )
        self.assertIsNotNone(assignment.id)
        self.assertEqual(assignment.skeleton_code, skeleton_code)
        self.assertEqual(assignment.answer_code, answer_code)

    def test_assignment_save_with_empty_name(self):
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
            deadline=deadline,
            question=question,
            constraints=constraints,
            skeleton_code=skeleton_code,
            answer_code=answer_code,
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
            skeleton_code=skeleton_code,
            answer_code=answer_code,
        )

        result = assignment.delete()
        is_lecture_dead = Lecture.objects.get(name = lecture_name)

        self.assertEqual(result[1].get('id'), assignment.id)
        self.assertIsNotNone(is_lecture_dead)
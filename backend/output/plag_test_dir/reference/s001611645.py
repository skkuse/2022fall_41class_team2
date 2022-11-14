# coding: utf-8
N = 10
h = []
for n in range(N):
    h.append(int(input()))

h = sorted(h, reverse = True)

for i in range(3):
    print(h[i])
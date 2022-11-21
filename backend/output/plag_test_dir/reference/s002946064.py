lists = []
for i in range(10):
    a = int(input())
    lists.append(a)
f = sorted(lists, reverse = True)
for i in range(3):
    print(f[i])
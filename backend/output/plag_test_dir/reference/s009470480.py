list = []
for i in range(0, 10):
    t = int(raw_input())
    list.append(t)

list.sort(reverse=True)
for i in range(0, 3):
    print list[i]
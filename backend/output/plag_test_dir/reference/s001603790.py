
arr = list([])

for i in range(10):
    arr.append(int(input()))

arr.sort(reverse=True)

for i in range(3):
    print arr[i]

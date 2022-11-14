height = [int(input()) for i in range(10)]
sort = sorted(height, reverse=True)
for i in range(3):
    print(sort[i])
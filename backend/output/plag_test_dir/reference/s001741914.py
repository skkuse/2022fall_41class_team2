ans=[]
for i in range (0,10):
    ans.append(int(input()))
ans.sort(reverse=True)
for i in range (0,3):
    print(ans[i])
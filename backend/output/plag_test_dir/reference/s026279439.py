data = []

for i in range(10):
	data.append(int(raw_input()))

data.sort(reverse = True)
print data[0]
print data[1]
print data[2]
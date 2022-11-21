import sys
mount_list = map(int, sys.stdin.readlines())
mount_list.sort(reverse=True)
for x in mount_list[:3]:
	print x
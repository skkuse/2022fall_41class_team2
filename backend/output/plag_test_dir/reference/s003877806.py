import sys
heights = [int(i) for i in sys.stdin.read().split()]
heights.sort(reverse=True)
print("\n".join(map(str, heights[:3])))

def calculate_area(radius):
    return 3.14 * radius ** 2

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def remove_duplicates(arr):
    unique_arr = []
    for item in arr:
        if item not in unique_arr:
            unique_arr.append(item)
    return unique_arr

# Test functions
radius = 5
print("Area of circle with radius", radius, ":", calculate_area(radius))

numbers = [4, 8, 2, 10, 4, 6, 8]
target = 4
result = linear_search(numbers, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found in the array")

values = [1, 2, 3, 2, 4, 5, 6, 1, 7, 8, 9]
unique_values = remove_duplicates(values)
print("Array with duplicates removed:", unique_values)

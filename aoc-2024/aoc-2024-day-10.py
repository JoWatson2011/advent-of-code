from pandas import read_table


def solve(path):
    grid = read_table(
        path,
        index_col=False,
        header=None,
        dtype=str).iloc[:, 0].tolist()
    grid = [[int(x) for x in y] for y in grid]

    [print(row) for row in grid]

    count = 0
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] == 0:
                count += find_route(grid, x, y)
    return count


def find_route(grid, x, y, nums=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], currIndex=0):
    current_value = grid[y][x]

    if (current_value != nums[currIndex]):
        return 0
    if currIndex == len(nums) - 1:
        return 1

    directions = [
        [x - 1, y],  # left
        [x, y + 1],  # down
        [x + 1, y],  # right
        [x, y-1],  # up
    ]
    valid_directions = [[xx, yy]
                        for xx, yy in directions if checkBoundaries(grid, xx, yy)]

    return sum(find_route(grid, xx, yy, nums, currIndex + 1) for xx, yy in valid_directions)


def checkBoundaries(grid, x, y):
    return 0 <= x < len(grid[0]) and 0 <= y < len(grid)


print(solve("day-10-input-test.txt"))

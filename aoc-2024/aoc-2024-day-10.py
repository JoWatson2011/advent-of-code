from pandas import read_table


def solve(path):
    grid = read_table(
        path,
        index_col=False,
        header=None,
        dtype=str).iloc[:, 0].tolist()
    grid = [[int(x) for x in y] for y in grid]
    count = 0
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] == 0:
                count += find_routes(grid, x, y)
    return count


def find_routes(grid, x, y):
    current_value = grid[y][x]

    if current_value == 9:
        return 1

    directions = [
        [x - 1, y],  # left
        [x, y + 1],  # down
        [x + 1, y],  # right
        [x, y-1],  # up
    ]
    
    peaks = 0

    for xx, yy in directions:
        if check_boundaries(grid, xx, yy): 
            if(grid[yy][xx] == current_value + 1):
                peaks += find_routes(grid, xx, yy, )

    return peaks


def check_boundaries(grid, x, y):
    return 0 <= x < len(grid[0]) and 0 <= y < len(grid)
from pandas import read_table

def solve(path):
    grid = read_table(
        path,
        index_col=False,
        header=None).iloc[:, 0].tolist()
    grid = [[x for x in row] for row in grid]

    # plants = [x for row in grid for x in row]

    
    cells_visited = []
    regions ={}
    perimeters = {}
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            id = '{0},{1}'.format(x, y)

            if id not in cells_visited: 
                area = get_region(grid, x, y, grid[y][x])
                region = regions.get(grid[y][x], [])
                region.append([area[0], len(area)])
                regions[grid[y][x]] = region
                print(regions[grid[y][x]])

            cells_visited = cells_visited + area

            # perimeter = calculate_perimeter(grid, x, y)
            # region = perimeters.get(grid[y][x], [])
            # region.append(perimeter)
            # perimeters[grid[y][x]] = region
    
    # return [sum(fences) * len(fences) for fences in perimeters.values()]
    return regions

def calculate_perimeter(grid, x, y):
    
    current_plant = grid[y][x]

    directions = [
        [x - 1, y],  # left
        [x, y + 1],  # down
        [x + 1, y],  # right
        [x, y-1],  # up
    ]
    
    perimeter = 4
    for xx, yy in directions:
        if check_boundaries(grid, xx, yy):
            if grid[yy][xx] == current_plant:
                perimeter -= 1
    
    return perimeter


def get_region(grid, x, y, plant, visited = []):
    current_plant = grid[y][x]
    id = '{0},{1}'.format(x, y)

    if id in visited:
        return 

    if current_plant != plant:
        return 
    
    visited.append(id)
    
    directions = [
        [x - 1, y],  # left
        [x, y + 1],  # down
        [x + 1, y],  # right
        [x, y-1],  # up
    ]
    
    
    for xx, yy in directions:
        if check_boundaries(grid, xx, yy): 
            get_region(grid, xx, yy, plant, visited)
    print(len(visited), plant)
    return visited

def check_boundaries(grid, x, y):
    return 0 <= x < len(grid[0]) and 0 <= y < len(grid)

res_test = solve("day-12-input-test.txt")
print(res_test)
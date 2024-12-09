from pandas import read_table

def solve(path):
    grid = read_table(
        path,
        index_col=False,
        header=None).iloc[:, 0].tolist()
    directions = [
        (-1, 0),  # right
        (0, 1),  # up
        (1, 0),  # left
        (0, -1),  # down
        (-1, 1),  # diag up right
        (-1, -1),  # diag down right
        (1, 1),  # diag up left
        (1, -1)  # diag down left
    ]

    res_xmas = []
    for direction_x, direction_y in directions:
        res_xmas.append(
            sum(
                [sum([search_grid(grid, x, y, direction_x, direction_y)
                      for x in range(len(grid[y]))])
                 for y in range(len(grid))]))
        
    

    indexes_mas = []
    for direction_x, direction_y in directions[4:]:
        for y in range(len(grid)):
            for x in range(len(grid[y])):
              if search_grid(grid, x, y, direction_x,
                                direction_y, 0, ["M", "A", "S"]):
                  indexes_mas.append([x,y])

    count = 0
    for x, y in indexes_mas:
        cross_point_directions = [
            (2,0),
            (0,-2),
            (-2,2)
        ]
        for cpx, cpy in cross_point_directions:
            # print(cpx, cpy)
            [print("X:", x, x+cpx, xx, "Y:", y,y+cpy, yy) for xx, yy in indexes_mas]
            # print(x, y, cpx, cpy)
            if any([xx == x + cpx and yy == y + cpy for xx, yy in indexes_mas]):
                count + 1
        
    # print(count)

    return {"XMAS": sum(res_xmas), "X-MAS": count}


def search_grid(grid, x, y, direction_x, direction_y, word_index=0, word=["X", "M", "A", "S"]):

    if word_index == len(word) - 1:
        return grid[y][x] == word[word_index]

    if grid[y][x] != word[word_index]:
        return False

    new_x, new_y = x + direction_x, y + direction_y

    if (0 <= new_x < len(grid[0]) and 0 <= new_y < len(grid)) and word_index + 1 <= len(word) - 1:
        if search_grid(grid, new_x, new_y, direction_x, direction_y, word_index + 1, word=word):
            return True
    return False


print(solve("day-4-input-test.txt"))

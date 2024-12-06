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

    res_x_mas = []
    # just the diagonal directions
    for direction_x, direction_y in directions[4:]:
        res_x_mas.append(
            [
                [
                    search_grid(grid, x, y, direction_x,
                                direction_y, 0, ["M", "A", "S"])
                    for x in range(len(grid[y]))
                ]
                for y in range(len(grid))
            ])
    res = [
        [any(r[y][x] for r in res_x_mas)
         for y in range(len(res_x_mas[0][0]))]
        for x in range(len(res_x_mas[0]))
    ]

    count_x = 0

    for y in range(len(res)):
        for x in range(len(res[y])):
            check_for_a = y + 1 < len(res) and x + \
                1 < len(res[0]) and grid[y+1][x+1] == "A"

            if res[y][x] == True and check_for_a:
                print(x, y)
                count_x += 1

    return {"XMAS": sum(res_xmas), "X-MAS": count_x}


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
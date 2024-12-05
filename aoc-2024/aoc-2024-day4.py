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
    res = []
    for direction_x, direction_y in directions:
        res.append(
            sum(
                [sum([search_grid(grid, x, y, direction_x, direction_y)
                      for x in range(len(grid[y]))])
                 for y in range(len(grid))]))

    return sum(res)


def search_grid(grid, x, y, direction_x, direction_y, word_index=0,):

    word = ["X", "M", "A", "S"]

    if word_index == len(word) - 1:
        return grid[y][x] == word[word_index]

    if grid[y][x] != word[word_index]:
        return False

    new_x, new_y = x + direction_x, y + direction_y

    if (0 <= new_x < len(grid[0]) and 0 <= new_y < len(grid)) and word_index + 1 <= len(word) - 1:
        if search_grid(grid, new_x, new_y, direction_x, direction_y, word_index + 1):
            return True
    return False


res = solve("day-4-input.txt")
print(res)

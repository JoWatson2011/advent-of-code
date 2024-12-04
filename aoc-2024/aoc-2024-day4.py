from pandas import read_table

def solve(path):
    grid = read_table(
        path,
        index_col = False, 
        header=None).iloc[:,0].tolist()

    return sum([sum([search_grid(grid, x, y) for x in range(len(grid[y]))]) for y in range(len(grid))])
    
def search_grid(grid, x, y, word_index = 0, dx = None, dy = None):
    directions = [
                  (-1, 0), # right
                  (0, 1), # up 
                  (1, 0), # left 
                  (0, -1), # down
                  (-1, 1), #  diag up right
                  (-1, -1), # diag down right
                  (1, 1), # diag up left
                  (1, -1) # diag down left
    ]
    word = ["X", "M","A", "S"]


    if word_index == len(word) -1:
        # if grid[y][x] == word[word_index]: print(x, y)
        return grid[y][x] == word[word_index]
    
    if grid[y][x] != word[word_index]:
        return False


    for dir_x, dir_y in directions:

        if (dx != dir_x and dx != None) and (dy != dir_y and dy != None):
            print(dx, dir_x)
            continue 
               
        new_x, new_y = x + dir_x, y + dir_y 

        if (0 <= new_x < len(grid[0]) and 0 <= new_y < len(grid)) and word_index + 1 <= len(word) -1: 
            if search_grid(grid, new_x, new_y, word_index + 1, dir_x, dir_y):
                return True
    return False

res = solve("day-4-input.txt")
print(res)


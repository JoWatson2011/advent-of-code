from pandas import read_table
from itertools import combinations


def solve(path):
    grid = read_table(
        path,
        index_col=False,
        header=None).iloc[:, 0].tolist()
    grid = [[x for x in y] for y in grid]

    return count_antinodes(grid)


def count_antinodes(grid):
    antenna_locations = get_antenna_locations(grid)

    antinode_locations = get_antinode_locations(antenna_locations, len(grid))

    return len(antinode_locations)


def get_antenna_locations(grid):
    antenna_locations = {}

    for y in range(len(grid)):
        for x in range(len(grid[y])):
            value = grid[y][x]
            if (value != "."):
                if value in list(antenna_locations.keys()):
                    antenna_locations[value].append([x, y])
                else:
                    antenna_locations[value] = [[x, y]]
    return antenna_locations


def get_antinode_locations(antenna_locations, boundary):
    antenna_frequencies = list(antenna_locations.keys())
    antinode_locations = []
    for frequency in antenna_frequencies:
        for point1, point2 in list(combinations(antenna_locations[frequency], 2)):
            x1, y1 = point1
            x2, y2 = point2

            xd, yd = x2 - x1, y2 - y1

            x0, y0 = x1 - xd, y1 - yd
            x3, y3 = x2 + xd, y2 + yd

            newCoords = []

            if (boundary > x0 >= 0 and boundary > y0 >= 0):
                newCoords.append('{0},{1}'.format(x0, y0))

            if (boundary > x3 >= 0 and boundary > y3 >= 0):
                newCoords.append('{0},{1}'.format(x3, y3))

            [antinode_locations.append(
                coord) for coord in newCoords if coord not in antinode_locations]

    return antinode_locations


print(solve("day-8-input.txt"))

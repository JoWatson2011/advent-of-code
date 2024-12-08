from pandas import read_table
from itertools import combinations, chain

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

    antinode_locations = ['{0},{1}'.format(x, y) for x, y in list(
        chain.from_iterable(antenna_locations.values()))]
    for frequency in antenna_frequencies:
        for point1, point2 in list(combinations(antenna_locations[frequency], 2)):
            x1, y1 = point1
            x2, y2 = point2

            xd, yd = x2 - x1, y2 - y1

            forward_points = get_forward_points(x2, y2, xd, yd, [], boundary)
            backwards_points = get_backwards_points(
                x1, y1, xd, yd, [], boundary)

            [antinode_locations.append(
                coord) for coord in forward_points + backwards_points if coord not in antinode_locations]

            [antinode_locations.append(
                coord) for coord in forward_points + backwards_points if coord not in antinode_locations]

    return antinode_locations


def get_forward_points(x2, y2, xd, yd, forward_points, boundary):
    x3, y3 = x2 + xd, y2 + yd

    if (boundary > x3 >= 0 and boundary > y3 >= 0):
        coord = '{0},{1}'.format(x3, y3)

        if coord not in forward_points:
            forward_points.append(coord)
        return get_forward_points(x3, y3, xd, yd, forward_points, boundary)
    else:
        return forward_points


def get_backwards_points(x1, y1, xd, yd, backwards_points, boundary):
    x0, y0 = x1 - xd, y1 - yd

    if (boundary > x0 >= 0 and boundary > y0 >= 0):
        coord = '{0},{1}'.format(x0, y0)

        if coord not in backwards_points:
            backwards_points.append(coord)
        return get_backwards_points(x0, y0, xd, yd, backwards_points, boundary)
    else:
        return backwards_points
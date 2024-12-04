from pandas import read_table

locations = read_table(
    "day-1-input.txt",
    index_col = False,
    delimiter='   ',
    engine = "python")

left = locations.iloc[:, 0].tolist()
right = locations.iloc[:, 1].tolist()

def  calculate_distance(left, right):
    distances = [sorted(right)[i] - sorted(left)[i] for i in range(len(left))]

    distances = [abs(i) for i in distances]

    return sum(distances)


def calculate_similarity(left, right):
    similarity_score = 0
    for left_value in left:
        n_in_right = len([i for i in right if i == left_value])
        similarity_score += left_value * n_in_right

    return similarity_score

from app.ai.career_matching.ranking import CareerRanker


def test_career_ranker_orders_matches_by_score():
    matches = [{"match_score": 20}, {"match_score": 80}]
    assert CareerRanker().rank(matches)[0]["match_score"] == 80

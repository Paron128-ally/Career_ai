from app.ai.skill_gap.prioritizer import SkillGapPrioritizer


def test_skill_gap_prioritizer_orders_priority():
    gaps = [{"priority": 1}, {"priority": 5}]
    assert SkillGapPrioritizer().prioritize(gaps)[0]["priority"] == 5

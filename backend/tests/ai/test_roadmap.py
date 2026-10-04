from app.ai.roadmap.planner import RoadmapPlanner


def test_roadmap_planner_preserves_steps_until_generation_is_added():
    steps = [{"id": "one"}]
    assert RoadmapPlanner().plan(steps) == steps

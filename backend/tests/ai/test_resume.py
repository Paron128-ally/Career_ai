from app.ai.resume.parser import ResumeParser


def test_resume_parser_has_extension_contract():
    assert ResumeParser().parse(b"", "resume.txt")["filename"] == "resume.txt"

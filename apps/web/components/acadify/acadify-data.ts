export type AcadifyLang = "vi" | "en";

export type AcadifyTable = {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type AcadifyStep = {
  actor: string;
  description: string;
};

export type AcadifyContent = {
  langToggleLabel: string;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    meta: string;
  };
  intro: string;
  problem: {
    title: string;
    lead: string;
    bullets: readonly string[];
  };
  goals: {
    title: string;
    lead: string;
    phaseTitle: string;
    phaseBody: string;
  };
  solution: {
    title: string;
    lead: string;
    steps: readonly AcadifyStep[];
  };
  features: {
    title: string;
    web: { title: string; lead: string; table: AcadifyTable };
    mobile: { title: string; lead: string; table: AcadifyTable };
  };
  comparison: {
    title: string;
    lead: string;
    table: AcadifyTable;
    summaryTitle: string;
    summaryBody: string;
  };
  stage: {
    title: string;
    lead: string;
    bullets: readonly string[];
  };
  closing: string;
  surveyCta: string;
};

export const ACADIFY_CONTENT: Record<AcadifyLang, AcadifyContent> = {
  vi: {
    langToggleLabel: "Chuyển ngôn ngữ",
    hero: {
      kicker: "TÀI LIỆU GIỚI THIỆU DỰ ÁN",
      title: "ACADIFY — Trợ lý AI cho giáo viên",
      subtitle:
        "Soạn đề & chấm bài tự động, giúp thầy cô dạy kèm tại nhà tiết kiệm thời gian",
      meta: "Bản thảo ý tưởng ban đầu • Dùng để khảo sát nhu cầu giáo viên • Tháng 07/2026",
    },
    intro:
      "Tài liệu này giải thích ngắn gọn về một dự án đang phát triển: một công cụ dùng AI để giúp thầy cô dạy kèm/dạy thêm tại nhà soạn đề, giao bài và chấm bài nhanh hơn nhiều lần so với cách làm thủ công hiện tại. Acadify xin gửi tài liệu này để quý thầy cô hiểu rõ Acadify đang muốn làm gì, tại sao lại làm, và rất mong nhận được góp ý trong giai đoạn đầu để sản phẩm thực sự sát với nhu cầu dạy học thật.",
    problem: {
      title: "Vấn đề Acadify nhận thấy hiện tại của giáo viên dạy kèm:",
      lead: "Thầy cô dạy thêm tại nhà thường phải tự làm mọi khâu như: soạn bài tập, ra đề kiểm tra bám sát chương trình và kỳ thi của học sinh, chấm bài, ghi nhận điểm và nhận xét tiến bộ cho từng em — tất cả đều làm thủ công, lặp đi lặp lại mỗi tuần, mỗi học sinh.",
      bullets: [
        "Soạn đề mới cho từng học sinh/lớp tốn nhiều giờ mỗi tuần, đặc biệt khi cần bám sát đúng cấu trúc đề thi (VD: thi vào 10, tốt nghiệp THPT).",
        "Chấm bài tự luận (giải thích, trình bày) mất thời gian và khó nhất quán khi dạy nhiều học sinh cùng lúc.",
        "Khó theo dõi học sinh đang yếu ở phần kiến thức nào để điều chỉnh bài giảng kịp thời.",
        "Các công cụ AI hiện có (ChatGPT, MagicSchool...) chủ yếu hỗ trợ tạo nội dung rời rạc, không theo đúng ma trận đề của chương trình GDPT Việt Nam, và không có nơi cho học sinh tự làm bài rồi được chấm ngay.",
      ],
    },
    goals: {
      title: "Mục tiêu Acadify hướng tới:",
      lead: "Tầm nhìn dài hạn: xây dựng một nền tảng AI đồng hành với giáo viên trong toàn bộ chương trình giáo dục Việt Nam, từ mầm non đến lớp 12. Vì đây là mục tiêu lớn, dự án sẽ đi từng bước chắc chắn thay vì làm tất cả cùng lúc.",
      phaseTitle:
        "Giai đoạn 1 (hiện tại) — Thu hẹp phạm vi đối tượng để làm đúng và làm tốt trước",
      phaseBody:
        "Tập trung vào giáo viên dạy kèm/dạy thêm tại nhà, ở cấp THCS và THPT (ưu tiên các lớp có kỳ thi quan trọng: lớp 9 thi vào 10, lớp 12 thi tốt nghiệp THPT), bắt đầu thử nghiệm với các môn: Toán, Vật lý, Sinh học và Hóa học. Sau khi công cụ thực sự hữu ích với nhóm giáo viên đầu tiên, mới mở rộng dần sang môn học và cấp học khác.",
    },
    solution: {
      title: "Giải pháp — vòng lặp khép kín:",
      lead: "Ý tưởng cốt lõi là tạo một vòng lặp khép kín giữa giáo viên và học sinh, thay vì chỉ là một công cụ tạo đề rời rạc như hiện có trên thị trường:",
      steps: [
        {
          actor: "Giáo viên",
          description:
            'Nhập/dán nội dung bài giảng, hoặc chọn chuyên đề (VD: "Di truyền học" - Sinh 12, "Cân bằng phương trình" - Hóa 8-9).',
        },
        {
          actor: "AI (nền tảng)",
          description:
            "Tự động sinh đề trắc nghiệm + tự luận ngắn, bám đúng cấu trúc/độ khó theo chương trình và kỳ thi mục tiêu.",
        },
        {
          actor: "Học sinh",
          description:
            "Làm bài ngay trên ứng dụng điện thoại (mobile app), mọi lúc mọi nơi, kể cả ngoài giờ học kèm.",
        },
        {
          actor: "AI chấm bài",
          description:
            "Chấm trắc nghiệm tức thì - với tự luận, AI đưa ra gợi ý điểm và nhận xét theo tiêu chí giáo viên thiết lập.",
        },
        {
          actor: "Giáo viên",
          description:
            "Xem báo cáo tổng hợp: học sinh nào yếu phần nào, tiến bộ theo thời gian ra sao, để điều chỉnh buổi dạy tiếp theo.",
        },
      ],
    },
    features: {
      title: "Tính năng & lợi ích của Acadify:",
      web: {
        title: "4.1 — Trang Web (dành cho Giáo viên)",
        lead: "Nơi giáo viên soạn đề, quản lý học sinh và xem báo cáo. Dùng trên máy tính để thao tác nhanh, xem dữ liệu chi tiết.",
        table: {
          headers: ["Tính năng", "Mô tả", "Lợi ích cho giáo viên"],
          rows: [
            [
              "Soạn đề tự động theo chương trình GDPT Việt Nam",
              "Chọn môn, lớp, chuyên đề hoặc dán nội dung bài giảng → AI sinh đề trắc nghiệm + tự luận bám đúng ma trận đề thi (vào 10 / tốt nghiệp THPT).",
              "Giảm thời gian soạn đề từ hàng giờ xuống vài phút; đề luôn đúng cấu trúc, không phải tự căn ma trận thủ công.",
            ],
            [
              "Ngân hàng câu hỏi riêng",
              "Lưu lại mọi câu hỏi đã tạo hoặc tự thêm vào, gắn nhãn theo chuyên đề/độ khó để tái sử dụng.",
              "Càng dùng lâu, ngân hàng đề càng phong phú, không phải soạn lại từ đầu mỗi lần.",
            ],
            [
              "Quản lý học sinh & giao bài",
              "Tạo danh sách học sinh, giao đề/bài tập riêng cho từng em hoặc theo nhóm.",
              "Cá nhân hóa bài tập theo trình độ từng em mà không tốn thêm thời gian chuẩn bị.",
            ],
            [
              "Chấm tự luận có hỗ trợ AI",
              "AI đọc câu trả lời tự luận của học sinh, so với đáp án/tiêu chí giáo viên đặt ra, gợi ý điểm và nhận xét — giáo viên duyệt lại trước khi chốt.",
              "Rút ngắn thời gian chấm bài, vẫn giữ quyền quyết định cuối cùng ở giáo viên.",
            ],
            [
              "Báo cáo tiến bộ học sinh",
              "Biểu đồ theo dõi điểm số, phần kiến thức còn yếu, mức độ tiến bộ theo từng tuần/tháng.",
              "Dễ dàng trao đổi với phụ huynh bằng số liệu cụ thể, biết chính xác cần ôn lại phần nào.",
            ],
          ],
        },
      },
      mobile: {
        title: "4.2 — Ứng dụng di động (dành cho Học sinh)",
        lead: "Nơi học sinh nhận bài, luyện tập và xem kết quả ngay trên điện thoại — kể cả khi không có mặt tại buổi học.",
        table: {
          headers: ["Tính năng", "Mô tả", "Lợi ích cho học sinh"],
          rows: [
            [
              "Làm bài mọi lúc mọi nơi",
              "Nhận đề/bài tập được giáo viên giao, làm trực tiếp trên điện thoại, không cần in giấy.",
              "Học sinh luyện tập thêm ngoài giờ học kèm, không phụ thuộc việc gặp trực tiếp giáo viên.",
            ],
            [
              "Chấm điểm & phản hồi tức thì",
              "Trắc nghiệm được chấm ngay khi nộp bài; tự luận có nhận xét sơ bộ trong khi chờ giáo viên duyệt.",
              "Học sinh biết ngay mình đúng/sai ở đâu, không phải chờ đến buổi học sau.",
            ],
            [
              "Luyện tập theo chuyên đề yếu",
              "AI gợi ý bài luyện tập tập trung vào đúng phần kiến thức học sinh còn yếu, dựa trên lịch sử làm bài.",
              "Ôn đúng trọng tâm thay vì làm lan man, tiết kiệm thời gian tự học.",
            ],
            [
              "Theo dõi tiến độ cá nhân",
              "Học sinh tự xem lại điểm số và tiến bộ của mình theo thời gian.",
              "Tăng động lực học tập, học sinh chủ động hơn với việc ôn luyện.",
            ],
          ],
        },
      },
    },
    comparison: {
      title: "Điểm khác biệt so với các công cụ hiện có:",
      lead: "Hiện tại đã có một số công cụ AI hỗ trợ giáo viên, nhưng mỗi công cụ chỉ giải quyết một phần nhỏ của quy trình, và hầu như không có công cụ nào thiết kế riêng cho giáo viên dạy kèm cá nhân tại Việt Nam theo đúng chương trình GDPT:",
      table: {
        headers: [
          "Công cụ hiện có",
          "Hạn chế hiện tại",
          "Hướng  giải quyết",
        ],
        rows: [
          [
            "Soạn đề tự động (ChatGPT, Myaloha, SmartTest AI...)",
            "Chỉ tạo câu hỏi rời rạc; không tự động bám đúng ma trận đề thi vào 10/THPT; không có nơi học sinh làm bài online.",
            "Đề bám đúng cấu trúc kỳ thi cụ thể; học sinh làm bài ngay trên app, không cần in giấy.",
          ],
          [
            "Chấm trắc nghiệm bằng camera (TNMaker, Chấm thi QM, AI.MarkTest)",
            "Chỉ chấm được bài đã in sẵn và học sinh làm trên giấy; không tạo đề, không có phần tự luận, không app cho học sinh.",
            "Vòng lặp khép kín: tạo đề → học sinh làm trên app → chấm cả trắc nghiệm lẫn tự luận.",
          ],
          [
            "Chấm tự luận (Gradescope, CoGrader, Markr)",
            "Thiết kế cho tiếng Anh/chương trình quốc tế, giá hướng đến trường học/tổ chức lớn, không tối ưu văn phong và barem chấm theo chương trình Việt Nam.",
            "Tối ưu cho tiếng Việt và cách chấm theo barem quen thuộc với giáo viên Việt Nam; giá phù hợp túi tiền cá nhân.",
          ],
          [
            "Nền tảng LMS lớn (OES và các hệ thống trường học)",
            "Hướng đến trường học/doanh nghiệp quy mô lớn, quy trình triển khai dài, không phù hợp một giáo viên dạy kèm vài chục học sinh.",
            "Thiết kế riêng cho quy mô nhỏ: một giáo viên, vài chục học sinh, dùng được ngay không cần duyệt qua nhà trường.",
          ],
        ],
      },
      summaryTitle: "Tóm lại điểm khác biệt cốt lõi",
      summaryBody:
        "Không phải một công cụ AI chung chung, mà là một quy trình khép kín, đúng chương trình Việt Nam, đúng đối tượng (giáo viên dạy kèm cá nhân), với mức giá và cách dùng phù hợp quy mô một người dạy — điều mà cả công cụ quốc tế lẫn công cụ Việt Nam hiện có chưa ai làm trọn vẹn.",
    },
    stage: {
      title: "Giai đoạn hiện tại & điều Acadify mong nhận được từ thầy cô",
      lead: "Dự án hiện đang ở bước khảo sát nhu cầu thực tế, trước khi bắt tay xây dựng phiên bản đầu tiên. Acadify rất mong quý thầy cô dành ít phút giúp Acadify ở các việc sau:",
      bullets: [
        "Trả lời một khảo sát ngắn (khoảng 5–7 phút) về cách thầy cô hiện đang soạn đề, chấm bài và những khó khăn gặp phải.",
        "Chia sẻ một đoạn ngắn để Acadify hiểu sâu hơn về quy trình dạy kèm thực tế.",
        "Nếu thấy ý tưởng phù hợp, đăng ký là một trong những người dùng thử đầu tiên khi có bản demo — hoàn toàn miễn phí trong giai đoạn thử nghiệm.",
        "Giới thiệu giúp Acadify đến các thầy cô khác để Acadify có thêm góc nhìn đa dạng.",
      ],
    },
    closing:
      "Đây là bản ý tưởng ban đầu, mọi góp ý (kể cả phản biện) đều rất quý với Acadify ở giai đoạn này. Cảm ơn quý thầy cô đã dành thời gian đọc và đồng hành cùng dự án.",
    surveyCta: "Đề xuất & góp ý với Acadify",
  },
  en: {
    langToggleLabel: "Switch language",
    hero: {
      kicker: "PROJECT INTRODUCTION DOCUMENT",
      title: "ACADIFY — AI Assistant for Teachers",
      subtitle:
        "Automated test creation & grading that saves private tutors time",
      meta: "Early concept draft • For teacher needs-discovery research • July 2026",
    },
    intro:
      "This document briefly explains a project under development: an AI-powered tool that helps private/home tutors create tests, assign exercises, and grade student work many times faster than today's manual workflow. Acadify is sharing this document so that teachers can clearly understand what Acadify is building and why, and warmly welcomes your feedback at this early stage so the product truly matches real teaching needs.",
    problem: {
      title: "The problems Acadify currently sees private tutors facing:",
      lead: "Private tutors teaching at home usually handle every step themselves: preparing exercises, writing tests aligned with each student's curriculum and target exams, grading, recording scores, and writing progress feedback for each student — all done manually, repeated every week, for every student.",
      bullets: [
        "Preparing new tests for each student or class takes hours every week, especially when they must follow the official exam structure (grade-10 entrance exam, national high-school graduation exam).",
        "Grading written responses (explanations, worked solutions) is time-consuming and hard to keep consistent when teaching many students at once.",
        "It is difficult to pinpoint which knowledge areas a student is weak in, so lessons cannot be adjusted in time.",
        "Existing AI tools (ChatGPT, MagicSchool, etc.) mostly generate isolated content: they do not follow the official test matrices of Vietnam's national curriculum, and they offer no place for students to take a test and be graded on the spot.",
      ],
    },
    goals: {
      title: "The goals Acadify is working toward:",
      lead: "Long-term vision: build an AI platform that supports teachers across the entire Vietnamese curriculum, from preschool through grade 12. Because this is an ambitious goal, the project will move forward in deliberate stages rather than attempting everything at once.",
      phaseTitle:
        "Phase 1 (current) — Narrowing the target audience to do it right and do it well first",
      phaseBody:
        "Focus on private/home tutors at the middle- and high-school levels (prioritizing exam-critical grades: grade 9 for the grade-10 entrance exam and grade 12 for the national graduation exam), starting with pilot subjects: Mathematics, Physics, Biology, and Chemistry. Only once the tool proves genuinely useful to this first group of teachers will it gradually expand to other subjects and grade levels.",
    },
    solution: {
      title: "The solution — a closed loop:",
      lead: "The core idea is a closed loop between teacher and student, rather than yet another stand-alone question generator like those already on the market:",
      steps: [
        {
          actor: "Teacher",
          description:
            'Enters or pastes lesson content, or selects a topic (e.g. "Genetics" — Biology 12, "Balancing chemical equations" — Chemistry 8–9).',
        },
        {
          actor: "AI (platform)",
          description:
            "Automatically generates multiple-choice and short essay questions matching the structure and difficulty of the target curriculum and exam.",
        },
        {
          actor: "Student",
          description:
            "Completes the assignment directly on the mobile app, anytime and anywhere — including outside tutoring hours.",
        },
        {
          actor: "AI grading",
          description:
            "Grades multiple-choice questions instantly; for essays, the AI suggests a score and feedback based on criteria the teacher defines.",
        },
        {
          actor: "Teacher",
          description:
            "Reviews consolidated reports — which students are weak in which areas and how they progress over time — to fine-tune the next lesson.",
        },
      ],
    },
    features: {
      title: "Acadify's features & benefits:",
      web: {
        title: "4.1 — Web app (for Teachers)",
        lead: "Where teachers create tests, manage students, and review reports. Used on a computer for fast workflows and detailed data views.",
        table: {
          headers: ["Feature", "Description", "Benefit for teachers"],
          rows: [
            [
              "Automated test creation aligned with Vietnam's national curriculum",
              "Select a subject, grade, and topic — or paste lesson content — and the AI generates multiple-choice and essay questions matching the official exam matrix (grade-10 entrance / graduation exam).",
              "Cuts test preparation from hours to minutes; tests always follow the correct structure, with no manual matrix alignment.",
            ],
            [
              "Private question bank",
              "Every generated or manually added question is saved and tagged by topic and difficulty for reuse.",
              "The question bank grows richer over time — no need to start from scratch each session.",
            ],
            [
              "Student management & assignments",
              "Create student rosters and assign tests or exercises to individual students or groups.",
              "Personalize practice to each student's level without extra preparation time.",
            ],
            [
              "AI-assisted essay grading",
              "The AI reads each student's written answer, compares it against the teacher's answer key and rubric, and suggests a score and feedback — the teacher reviews and approves before finalizing.",
              "Significantly shortens grading time while keeping the final decision with the teacher.",
            ],
            [
              "Student progress reports",
              "Charts tracking scores, weak knowledge areas, and week-by-week and month-by-month progress.",
              "Communicate with parents using concrete data, and know exactly which topics need revisiting.",
            ],
          ],
        },
      },
      mobile: {
        title: "4.2 — Mobile app (for Students)",
        lead: "Where students receive assignments, practice, and view their results right on their phones — even when they are not at a tutoring session.",
        table: {
          headers: ["Feature", "Description", "Benefit for students"],
          rows: [
            [
              "Practice anytime, anywhere",
              "Receive assignments from the teacher and complete them directly on the phone — no printing required.",
              "Students keep practicing outside tutoring hours, without depending on in-person sessions.",
            ],
            [
              "Instant scoring & feedback",
              "Multiple-choice answers are graded the moment they are submitted; essays receive preliminary AI feedback while awaiting the teacher's review.",
              "Students see immediately where they went right or wrong, instead of waiting for the next session.",
            ],
            [
              "Targeted practice on weak topics",
              "The AI recommends exercises focused on the exact knowledge areas a student struggles with, based on their submission history.",
              "Revision targets what matters most, saving self-study time.",
            ],
            [
              "Personal progress tracking",
              "Students can review their own scores and improvement over time.",
              "Builds motivation and encourages students to take ownership of their revision.",
            ],
          ],
        },
      },
    },
    comparison: {
      title: "How Acadify differs from existing tools:",
      lead: "Several AI tools already assist teachers, but each covers only a small slice of the workflow — and virtually none is designed for individual private tutors in Vietnam following the national curriculum:",
      table: {
        headers: [
          "Existing tools",
          "Current limitations",
          "Acadify's approach",
        ],
        rows: [
          [
            "Automated test generators (ChatGPT, Myaloha, SmartTest AI, …)",
            "Only produce isolated questions; do not follow the official grade-10 entrance / graduation exam matrices; no place for students to take tests online.",
            "Tests match the structure of the specific target exam; students take them right in the app — no printing needed.",
          ],
          [
            "Camera-based multiple-choice graders (TNMaker, QM Grader, AI.MarkTest)",
            "Only grade pre-printed answer sheets completed on paper; no test creation, no essay support, no student app.",
            "A closed loop: generate the test → students complete it in the app → both multiple-choice and essays are graded.",
          ],
          [
            "Essay grading tools (Gradescope, CoGrader, Markr)",
            "Built for English-language and international curricula; priced for schools and large institutions; not tuned to Vietnamese writing style or grading rubrics.",
            "Optimized for Vietnamese and the rubric-based grading familiar to Vietnamese teachers, at a price an individual tutor can afford.",
          ],
          [
            "Large LMS platforms (OES and school-wide systems)",
            "Aimed at schools and enterprises at scale, with long deployment cycles; impractical for one tutor with a few dozen students.",
            "Purpose-built for small scale: one teacher, a few dozen students, usable immediately with no institutional approval process.",
          ],
        ],
      },
      summaryTitle: "The core differentiator, in short",
      summaryBody:
        "Not another general-purpose AI tool, but a closed, end-to-end workflow — aligned with the Vietnamese curriculum, built for the right audience (individual private tutors), and priced and designed for a single teacher's practice. Neither international nor Vietnamese tools currently deliver this in full.",
    },
    stage: {
      title: "Current stage & what Acadify hopes to receive from teachers",
      lead: "The project is currently at the needs-discovery stage, before building the first version. Acadify would be grateful if teachers could spare a few minutes to help with the following:",
      bullets: [
        "Answer a short survey (about 5–7 minutes) on how you currently prepare tests, grade student work, and the difficulties you encounter.",
        "Share a short note so Acadify can gain a deeper understanding of real-world tutoring workflows.",
        "If the idea resonates with you, sign up as one of the first trial users when the demo is ready — completely free during the pilot phase.",
        "Introduce Acadify to other teachers so the project can gather more diverse perspectives.",
      ],
    },
    closing:
      "This is an early draft of the idea — every comment (including critical ones) is invaluable to Acadify at this stage. Thank you for taking the time to read and for supporting the project.",
    surveyCta: "Suggestions & feedback with Acadify",
  },
};

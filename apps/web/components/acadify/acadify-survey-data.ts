// Vietnamese-only teacher survey, mirroring the printed questionnaire PDF.
// Question ids (q1..q23) are stable keys: q21/q22 are lifted into the email
// header as sender info, every other answer is rendered as "question: answer".

export const OTHER_OPTION = "Khác";

type QuestionBase = {
  id: string;
  number: number;
  title: string;
  hint?: string;
};

export type SurveyChoiceQuestion = QuestionBase & {
  kind: "radio" | "checkbox";
  options: readonly string[];
  hasOther?: boolean;
  maxChoices?: number;
};

export type SurveyScaleQuestion = QuestionBase & {
  kind: "scale";
};

export type SurveyTextQuestion = QuestionBase & {
  kind: "short" | "long";
  placeholder?: string;
};

export type SurveyChannelsQuestion = QuestionBase & {
  kind: "channels";
  channels: readonly { label: string; placeholder: string }[];
};

export type SurveyQuestion =
  | SurveyChoiceQuestion
  | SurveyScaleQuestion
  | SurveyTextQuestion
  | SurveyChannelsQuestion;

export type SurveySection = {
  title: string;
  note?: string;
  questions: readonly SurveyQuestion[];
};

const HINT_RADIO = "Chọn 1 đáp án";
const HINT_CHECKBOX = "Cho phép chọn nhiều đáp án";
const HINT_OPTIONAL = "Không bắt buộc";

export const SURVEY_SECTIONS: readonly SurveySection[] = [
  {
    title: "PHẦN 1 — Thông tin chung",
    questions: [
      {
        kind: "checkbox",
        id: "q1",
        number: 1,
        title: "Thầy/Cô đang dạy bộ môn nào?",
        hint: HINT_CHECKBOX,
        hasOther: true,
        options: [
          "Toán",
          "Vật lý",
          "Sinh học",
          "Hóa học",
          "Ngữ văn",
          "Tiếng Anh",
        ],
      },
      {
        kind: "checkbox",
        id: "q2",
        number: 2,
        title: "Thầy/Cô đang dạy cấp/lớp nào?",
        hint: HINT_CHECKBOX,
        hasOther: true,
        options: [
          "Lớp 6–7",
          "Lớp 8–9 (có thi vào 10)",
          "Lớp 10–11",
          "Lớp 12 (thi tốt nghiệp THPT)",
        ],
      },
      {
        kind: "radio",
        id: "q3",
        number: 3,
        title: "Số năm kinh nghiệm giảng dạy của Thầy/Cô?",
        hint: HINT_RADIO,
        options: ["Dưới 1 năm", "1–3 năm", "3–5 năm", "Trên 5 năm"],
      },
      {
        kind: "radio",
        id: "q4",
        number: 4,
        title: "Hiện Thầy/Cô đang dạy khoảng bao nhiêu học sinh?",
        hint: HINT_RADIO,
        options: [
          "1–5 học sinh",
          "6–15 học sinh",
          "16–30 học sinh",
          "Trên 30 học sinh",
        ],
      },
      {
        kind: "radio",
        id: "q5",
        number: 5,
        title: "Hình thức dạy thêm chủ yếu của Thầy/Cô?",
        hint: HINT_RADIO,
        options: [
          "Dạy 1 kèm 1",
          "Dạy nhóm nhỏ (2–5 em)",
          "Dạy nhóm lớn hơn",
          "Cả 1 kèm 1 và nhóm",
        ],
      },
    ],
  },
  {
    title: "PHẦN 2 — Thực trạng soạn đề & chấm bài",
    questions: [
      {
        kind: "radio",
        id: "q6",
        number: 6,
        title: "Trung bình Thầy/Cô mất bao lâu để soạn 1 đề kiểm tra?",
        hint: HINT_RADIO,
        options: ["Dưới 30 phút", "30–60 phút", "1–2 giờ", "Trên 2 giờ"],
      },
      {
        kind: "checkbox",
        id: "q7",
        number: 7,
        title: "Hiện Thầy/Cô soạn đề bằng cách nào là chủ yếu?",
        hint: HINT_CHECKBOX,
        hasOther: true,
        options: [
          "Tự soạn tay hoàn toàn",
          "Lấy/chỉnh sửa từ sách, đề có sẵn",
          "Dùng ChatGPT hoặc AI tương tự",
          "Dùng phần mềm soạn đề chuyên dụng",
        ],
      },
      {
        kind: "radio",
        id: "q8",
        number: 8,
        title:
          "Trung bình Thầy/Cô mất bao lâu để chấm 1 bài tự luận cho 1 học sinh?",
        hint: HINT_RADIO,
        options: ["Dưới 5 phút", "5–15 phút", "15–30 phút", "Trên 30 phút"],
      },
      {
        kind: "checkbox",
        id: "q9",
        number: 9,
        title: "Khó khăn lớn nhất hiện nay của Thầy/Cô là gì?",
        hint: "Chọn tối đa 3 đáp án",
        hasOther: true,
        maxChoices: 3,
        options: [
          "Soạn đề tốn nhiều thời gian",
          "Khó bám đúng ma trận/cấu trúc đề thi (VD: thi vào L10, tốt nghiệp THPT)",
          "Chấm tự luận mất thời gian và khó nhất quán",
          "Khó theo dõi học sinh đang yếu phần kiến thức nào",
          "Khó cá nhân hóa bài tập cho từng em",
        ],
      },
    ],
  },
  {
    title: "PHẦN 3 — Công cụ đang sử dụng",
    questions: [
      {
        kind: "radio",
        id: "q10",
        number: 10,
        title:
          "Thầy/Cô đã từng dùng công cụ AI nào để hỗ trợ soạn đề/chấm bài chưa?",
        hint: HINT_RADIO,
        hasOther: true,
        options: [
          "Chưa từng dùng",
          "Có dùng ChatGPT",
          "Có dùng công cụ chuyên biệt khác (MagicSchool, TNMaker…)",
        ],
      },
      {
        kind: "long",
        id: "q11",
        number: 11,
        title: "Nếu có, công cụ đó tên gì và Thầy/Cô thấy còn thiếu điều gì?",
        hint: HINT_OPTIONAL,
        placeholder: "Chia sẻ của thầy/cô...",
      },
    ],
  },
  {
    title: "PHẦN 4 — Mức độ cần thiết của từng tính năng",
    note: "Kéo thanh trượt để chọn mức độ từ 1 đến 5, với 1 = Không cần thiết và 5 = Rất cần thiết.",
    questions: [
      {
        kind: "scale",
        id: "q12",
        number: 12,
        title:
          "Soạn đề tự động bám đúng chương trình & cấu trúc kỳ thi VN",
      },
      {
        kind: "scale",
        id: "q13",
        number: 13,
        title:
          "Ngân hàng câu hỏi riêng để tái sử dụng, gắn nhãn chuyên đề/độ khó",
      },
      {
        kind: "scale",
        id: "q14",
        number: 14,
        title: "Quản lý học sinh & giao bài riêng cho từng em/nhóm",
      },
      {
        kind: "scale",
        id: "q15",
        number: 15,
        title:
          "Chấm tự luận có AI hỗ trợ (gợi ý điểm + nhận xét, giáo viên duyệt lại)",
      },
      {
        kind: "scale",
        id: "q16",
        number: 16,
        title:
          "Báo cáo tiến bộ học sinh (biểu đồ điểm, phần yếu, tiến bộ theo tuần/tháng)",
      },
      {
        kind: "scale",
        id: "q17",
        number: 17,
        title: "App di động để học sinh tự làm bài & xem kết quả ngay",
      },
    ],
  },
  {
    title: "PHẦN 5 — Sẵn sàng trải nghiệm & giá cả",
    questions: [
      {
        kind: "radio",
        id: "q18",
        number: 18,
        title: "Thầy/Cô có muốn dùng thử bản demo miễn phí khi ra mắt không?",
        hint: HINT_RADIO,
        options: [
          "Có, rất muốn thử",
          "Có thể thử nếu tiện",
          "Cần tìm hiểu thêm trước khi quyết định",
          "Không quan tâm",
        ],
      },
      {
        kind: "radio",
        id: "q19",
        number: 19,
        title:
          "Nếu công cụ thực sự hữu ích, Thầy/Cô sẵn sàng trả bao nhiêu/tháng?",
        hint: HINT_RADIO,
        hasOther: true,
        options: [
          "Chỉ dùng nếu miễn phí",
          "Dưới 100.000đ",
          "100.000đ – 300.000đ",
          "300.000đ – 500.000đ",
          "Trên 500.000đ",
        ],
      },
      {
        kind: "channels",
        id: "q20",
        number: 20,
        title: "Thầy/Cô muốn nhận thông tin cập nhật về dự án qua kênh nào?",
        hint: "Chọn kênh Thầy/Cô muốn và điền thông tin liên hệ tương ứng — không bắt buộc",
        channels: [
          { label: "Zalo", placeholder: "Nhập số điện thoại Zalo của Thầy/Cô" },
          { label: "Email", placeholder: "Nhập địa chỉ email của Thầy/Cô" },
          { label: "Facebook", placeholder: "Nhập link Facebook của Thầy/Cô" },
          {
            label: OTHER_OPTION,
            placeholder: "Ghi rõ kênh khác và cách liên hệ",
          },
        ],
      },
    ],
  },
  {
    title: "PHẦN 6 — Thông tin liên hệ (không bắt buộc)",
    questions: [
      {
        kind: "short",
        id: "q21",
        number: 21,
        title: "Họ và tên",
        hint: HINT_OPTIONAL,
        placeholder: "Họ và tên của thầy/cô",
      },
      {
        kind: "short",
        id: "q22",
        number: 22,
        title: "Số điện thoại/Zalo",
        hint: HINT_OPTIONAL,
        placeholder: "Số điện thoại hoặc Zalo",
      },
      {
        kind: "long",
        id: "q23",
        number: 23,
        title:
          "Thầy/Cô có đồng ý dành 15–20 phút trò chuyện ngắn để chia sẻ sâu hơn về cách dạy kèm của mình không?",
        hint: "Không bắt buộc — thầy/cô có thể chia sẻ thoải mái, không giới hạn độ dài",
        placeholder:
          "Thầy/cô có thể trả lời và chia sẻ thêm bất kỳ điều gì tại đây...",
      },
    ],
  },
];

// q21/q22 become the sender block at the top of the survey email.
export const SENDER_NAME_QUESTION_ID = "q21";
export const SENDER_PHONE_QUESTION_ID = "q22";

export const SURVEY_UI = {
  backToIntro: "Quay lại",
  heroTitle: "KHẢO SÁT NHU CẦU GIÁO VIÊN",
  heroSubtitle: "ACADIFY - Công cụ AI hỗ trợ soạn đề & chấm bài",
  heroNote: "(Thời gian làm khảo sát: khoảng 5–7 phút)",
  scaleMinLabel: "Không cần thiết",
  scaleMaxLabel: "Rất cần thiết",
  otherPlaceholder: "Vui lòng ghi rõ...",
  emptyAnswer: "(Bỏ trống)",
  submit: "Gửi khảo sát",
  sending: "Đang gửi...",
  validationRequired: "Vui lòng trả lời câu hỏi này.",
  validationOther: "Vui lòng ghi rõ nội dung cho mục “Khác”.",
  validationChannel: "Vui lòng điền thông tin liên hệ cho kênh đã chọn.",
  toastMissing: "Vui lòng kiểm tra lại các câu chưa trả lời.",
  toastSuccess: "Cảm ơn thầy/cô! Khảo sát đã được gửi.",
  toastRateLimited: "Thầy/Cô gửi hơi nhanh — vui lòng thử lại sau ít phút.",
  toastInvalid: "Thông tin chưa hợp lệ, vui lòng kiểm tra lại.",
  toastError: "Lỗi. Vui lòng thử lại sau.",
  successTitle: "Đã gửi khảo sát thành công!",
  successBody:
    "Mọi góp ý và đề xuất từ quý thầy cô đều được Acadify trân trọng ghi nhận và xem xét nghiêm túc. Nội dung phản hồi sẽ được chuyển trực tiếp đến đội ngũ Acadify nhằm không ngừng hoàn thiện và nâng cao chất lượng sản phẩm.",
  closing: "Cảm ơn thầy/cô đã dành thời gian trả lời khảo sát!",
} as const;

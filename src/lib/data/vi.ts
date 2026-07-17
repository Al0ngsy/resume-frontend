import { SiteData } from "@/types";

const siteDataVi: SiteData = {
  name: "Le Quoc Anh Tran",
  title: "Backend Software Engineer",
  introduction:
    "Lập trình viên backend với hơn 6 năm kinh nghiệm xây dựng kiến trúc microservice phân tán và ứng dụng SaaS trên nền tảng đám mây. Tập trung vào TypeScript, NestJS và PostgreSQL — thiết kế RESTful API hiệu năng cao và hệ thống backend có khả năng mở rộng.",
  email: "lequocanhtr@gmail.com",
  github: "https://github.com/Al0ngsy",
  linkedin: "https://linkedin.com/in/lequocanhtr",
  philosophy:
    "Tôi tin rằng một hệ thống backend xuất sắc được xây dựng trên ba trụ cột: sự đơn giản, độ tin cậy và sự hiểu biết sâu sắc về lĩnh vực. Mọi API đều nên trực quan, mọi truy vấn cơ sở dữ liệu đều cần có chủ đích, và mọi hệ thống đều nên được thiết kế để phát triển bền vững mà không tích lũy nợ kỹ thuật.",
  careerSummary:
    "Backend Software Engineer với hơn 6 năm kinh nghiệm trên toàn bộ stack backend — từ tích hợp thanh toán và hệ thống xác thực đến nền tảng CMS, API công khai và dịch vụ AI. Tôi đã làm việc với nền tảng B2B SaaS video-on-demand phục vụ nhiều khách doanh nghiệp, xử lý hơn 100.000 giao dịch thanh toán hàng năm. Hiện đang tập trung xây dựng dịch vụ backend tích hợp AI bằng NestJS, LangChain và OpenAI.",
  projects: [
    {
      title: "AI Microservice",
      description:
        "Microservice REST API cung cấp các tính năng AI với Retrieval-Augmented Generation (RAG), embeddings và tool/function calling.",
      problem:
        "Nền tảng cần các tính năng thông minh — tìm kiếm ngữ nghĩa, hỏi đáp tài liệu và quy trình làm việc hỗ trợ AI — nhưng chưa có cơ sở hạ tầng AI nào.",
      solution:
        "Thiết kế và xây dựng microservice dựa trên NestJS sử dụng LangChain, OpenAI API, pgvector cho lưu trữ vector và pipeline RAG. Triển khai các pattern tool-calling và function-calling cho tương tác AI có cấu trúc.",
      technologies: [
        "NestJS",
        "TypeScript",
        "LangChain",
        "OpenAI API",
        "pgvector",
        "PostgreSQL",
        "RAG",
      ],
      challenges:
        "Cân bằng giữa chất lượng phản hồi và độ trễ, cũng như thiết kế pipeline embedding đồng bộ với thông tin thay đổi.",
      lessons:
        "Pipeline RAG đòi hỏi chiến lược chunking cẩn thận và prompt engineering. Tìm kiếm vector thôi chưa đủ — retrieval kết hợp (keyword + semantic) cho kết quả tốt hơn. Khử trùng lặp là bắt buộc để tránh thông tin thừa trong phản hồi.",
    },
    {
      title: "Framework Migration PostgreSQL",
      description:
        "Quy trình migration tối ưu cho cơ sở dữ liệu PostgreSQL production với hòa giải schema tự động và theo dõi thay đổi.",
      problem:
        "Các migration cơ sở dữ liệu hiện tại gây deadlock thường xuyên trên production, làm mất ổn định và khiến deployment không thể dự đoán.",
      solution:
        "Phát triển framework migration với hòa giải schema tự động, theo dõi thay đổi và tối ưu hiệu năng. Giảm thời gian gián đoạn và làm cho migration đáng tin cậy, có thể lặp lại.",
      technologies: ["PostgreSQL", "TypeScript", "Node.js", "Database Design"],
      challenges:
        "Xử lý migration zero-downtime trên cơ sở dữ liệu production trực tiếp với hàng triệu dòng mà không khóa bảng.",
      lessons:
        "Migration cơ sở dữ liệu trên production đòi hỏi cách tiếp cận hoàn toàn khác so với development. Batching, chiến lược lock-free và kế hoạch rollback toàn diện là thiết yếu.",
    },
    {
      title: "Backend Nền tảng B2B SaaS VOD",
      description:
        "Các dịch vụ backend cốt lõi cho nền tảng video-on-demand multi-tenant phục vụ khách hàng doanh nghiệp bao gồm Samsung và Waipu.",
      problem:
        "Nhiều khách hàng B2B cần một backend thống nhất có thể xử lý đa dạng content ingestion, mô hình thanh toán (SVOD, TVOD, EST) và tích hợp bên thứ ba.",
      solution:
        "Phát triển và bảo trì một stack dịch vụ backend toàn diện bao gồm CMS, dịch vụ thanh toán (PayPal, Stripe, Apple/Google/Amazon/Roku IAP), reporting và RESTful Feed API công khai cho đối tác bên ngoài.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "React Admin",
        "Google Pub/Sub",
        "AWS S3",
        "Docker",
        "Kubernetes",
      ],
      challenges:
        "Hỗ trợ đồng thời nhiều nhà cung cấp thanh toán và mô hình subscription trong khi duy trì kiến trúc event-driven sạch sẽ.",
      lessons:
        "Kiến trúc event-driven với webhooks và message queues là thiết yếu cho xử lý thanh toán. Tính idempotent là không thể thương lượng khi xử lý giao dịch tài chính.",
    },
    {
      title: "Prototype Nền tảng Giao dịch Options",
      description:
        "Prototype full-stack cho nền tảng giao dịch options với backend microservice, thiết kế cơ sở dữ liệu và dashboard monitoring.",
      problem:
        "Doanh nghiệp muốn khám phá giao dịch options như một dòng sản phẩm mới, nhưng cần prototype nhanh để xác định khả thi về kỹ thuật.",
      solution:
        "Xây dựng prototype sử dụng Alpaca Trading API cho dữ liệu thị trường và thực thi lệnh, Prisma ORM cho truy cập cơ sở dữ liệu type-safe, và backend microservice với dashboard monitoring.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Prisma ORM",
        "PostgreSQL",
        "Alpaca API",
        "Microservices",
      ],
      challenges:
        "Xử lý dữ liệu thị trường theo thời gian thực và đảm bảo độ tin cậy thực thi lệnh dưới tải mô phỏng.",
      lessons:
        "Hệ thống giao dịch có yêu cầu riêng biệt về idempotency, audit logging và xử lý exactly-once, khác biệt đáng kể so với ứng dụng CRUD tiêu chuẩn.",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "simpleTechs GmbH",
      period: "Thg 7 2024 — Hiện tại",
      description:
        "Thiết kế và triển khai các microservice REST API cho tính năng AI với NestJS, LangChain và OpenAI API. Phát triển quy trình migration PostgreSQL tối ưu, xây dựng dịch vụ backend cho nền tảng giao dịch vàng và prototype nền tảng giao dịch options. Tự động hóa kiểm thử với Jest và quản lý CI/CD pipeline qua Docker và Bitbucket Pipelines.",
      technologies: [
        "NestJS",
        "TypeScript",
        "LangChain",
        "OpenAI",
        "PostgreSQL",
        "pgvector",
        "Docker",
        "Kubernetes",
        "Helm",
        "Jest",
      ],
    },
    {
      title: "Sinh viên làm việc — Phát triển phần mềm",
      company: "simpleTechs GmbH",
      period: "Thg 9 2019 — Thg 6 2024",
      description:
        "Đóng góp cho toàn bộ stack backend của nền tảng B2B SaaS VOD. Mở rộng tính năng CMS với content ingestion tự động từ AWS S3. Phát triển quy trình thanh toán event-driven xử lý 100K+ giao dịch/năm qua PayPal, Stripe và IAP của các app store lớn. Thiết kế và bảo trì RESTful Feed API công khai cho đối tác bao gồm Samsung và Waipu. Tối ưu hóa schema cơ sở dữ liệu, truy vấn và chức năng reporting.",
      technologies: [
        "TypeScript",
        "PostgreSQL",
        "React Admin",
        "Google Pub/Sub",
        "AWS S3",
        "PayPal",
        "Stripe",
        "Docker",
      ],
    },
  ],
  skills: [
    {
      category: "Ngôn ngữ",
      items: ["TypeScript", "JavaScript", "SQL", "PL/pgSQL"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "REST APIs",
        "Microservices",
        "Event-Driven Architecture",
      ],
    },
    {
      category: "Cơ sở dữ liệu",
      items: [
        "PostgreSQL",
        "pgvector",
        "Prisma ORM",
        "Database Design",
        "Query Optimization",
      ],
    },
    {
      category: "AI & ML",
      items: ["LangChain", "OpenAI API", "RAG", "Embeddings", "LLMs"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "Docker",
        "Kubernetes",
        "Helm",
        "AWS S3",
        "Google Pub/Sub",
        "Bitbucket Pipelines",
        "CI/CD",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "React Admin", "Vite"],
    },
    {
      category: "Kiểm thử",
      items: ["Jest", "Unit Testing", "Integration Testing"],
    },
    {
      category: "Đang học",
      items: ["Python", "C#"],
    },
  ],
};

export default siteDataVi;
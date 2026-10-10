# AI-LOG.md

## 2026-10-10 — Thiết lập Repository, Agent Harness và Assistant Brief
Tool: OpenAI Codex
Asked For:Yêu cầu Codex đọc đặc tả bài tập cartTotal và rubric, hướng dẫn thiết lập repository theo từng bước, kết nối repository trên máy với repository GitHub mới, kiểm tra các quality gates và xây dựng bản yêu cầu triển khai (ASSISTANT_BRIEF.md).
Kept: 
- Giữ lại các cấu hình và mẫu hướng dẫn do Codex cung cấp cho AGENTS.md, công cụ kiểm tra định dạng bằng Node.js, các npm scripts và GitHub Actions.
- Sử dụng file ASSISTANT_BRIEF.md do Codex tạo, bao gồm function contract, business rules, các trường hợp lỗi, phạm vi file được phép chỉnh sửa, quy định không thêm dependencies, worked example và các lệnh kiểm tra.
- Giữ lại những thay đổi cấu hình do Codex thực hiện nhằm đảm bảo Agent Harness và quality gates phù hợp với yêu cầu bài tập.
Changed:
- Bổ sung yêu cầu trong ASSISTANT_BRIEF.md: không chỉnh sửa AI-LOG.md trong nhiệm vụ implement; không bịa các chỉnh sửa, đề xuất bị từ chối, phần tự viết hoặc kết quả kiểm tra.
Rejected:
- Không sử dụng phương án fork starter repository do trợ lý đề xuất. Thay vào đó, sinh viên lựa chọn tạo một repository GitHub mới để dễ sử dụng.
By hand:
- Tự tạo repository github mới và cung cấp URL cho Codex để thực hiện kết nối

## 2026-10-10 - Thiết lập Quality Gates và Github Actions CI
Tool: OpenAI Codex.
Asked for: Yêu cầu Codex hướng dẫn thiết lập công cụ kiểm tra định dạng không sử dụng thư viện bên ngoài, cấu hình npm scripts và GitHub Actions CI để tự động kiểm tra chất lượng dự án.
Kept:

Sử dụng mẫu scripts/check-format.js do Codex cung cấp, viết bằng Node.js và không sử dụng dependencies bên ngoài. Script kiểm tra khoảng trắng cuối dòng, tab thụt lề và ký tự xuống dòng cuối file.

Giữ lại cấu hình npm scripts do Codex hướng dẫn:
- npm test: chạy node --test.
- npm run format:check: chạy scripts/check-format.js.
- npm run check: chạy lần lượt format check và tests.
Sử dụng mẫu .github/workflows/ci.yml do Codex cung cấp. Workflow được cấu hình kích hoạt khi push hoặc pull_request, checkout repository, thiết lập Node.js 24 và chạy format check cùng automated tests.

Changed:None
Rejected:None
By hand: None

## 2026-10-10 - Bổ sung automated tests cho cartTotal
Tool: OpenAI Codex.

Asked for: Bổ sung tests kiểm tra hành vi của cartTotal theo specification, giữ các tests hiện có, chạy kiểm tra và đọc diff.

Kept: Bộ 20 tests do Codex bổ sung trong test/cart.test.js, kiểm tra subtotal, VAT, shipping dưới/bằng/trên ngưỡng, kiểu trả về, làm tròn và các trường hợp RangeError. Giữ nguyên test worked example và test empty cart đã có, tổng cộng 22 tests.

Changed: None
Rejected: None
By hand: None


## 2026-10-10 — Implement cartTotal theo specification

Tool: OpenAI Codex.

Asked for: Đọc AGENTS.md và ASSISTANT_BRIEF.md, implement cartTotal trong src/cart.js, giữ nguyên tests, không thêm dependencies, chạy npm run check và giải thích implementation.

Kept: Implementation do Codex viết trong src/cart.js, gồm tính subtotal, VAT, shipping, xử lý giỏ rỗng, ném RangeError cho giá âm hoặc quantity không hợp lệ, và làm tròn kết quả cuối bằng Math.round. Codex đã đọc diff và chạy npm run check: format check pass, 22 tests pass, 0 fail.

Changed: None
Rejected: None
By hand: None
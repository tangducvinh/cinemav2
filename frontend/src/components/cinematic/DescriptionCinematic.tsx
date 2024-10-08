import MenuTitle from "../home/MenuTitle";

const data = [
  "Bạn là một người mê phim, bạn thích khám phá bí mật phía sau hậu trường của các bom tấn, bạn thần tượng nhà làm phim nào đấy bởi tư duy vượt thời đại, phong cách quay phim đặc biệt và những câu chuyện đầy mới lạ, bạn ngưỡng mộ một ngôi sao bởi khả năng diễn xuất cực đỉnh… Thậm chí nếu bạn muốn tìm hiểu sâu hơn về điện ảnh, các trào lưu chủ nghĩa từng tạo tiếng vang trong lịch sử, sự ra đời của các thể loại và bản sắc riêng của từng nền điện ảnh đến từ các quốc gia khác nhau.",
  "Chào mừng đến chuyên trang điện ảnh, nơi được xem như một thư viện với đầy đủ các thông tin về những bộ phim, đạo diễn, diễn viên dành cho người yêu phim. Tại đây bạn dễ dàng tìm hiểu được tiểu sử của vị đạo diễn yêu thích, có được thông tin bên lề của các bộ phim hay đang chiếu tại rạp. Ngoài ra nếu đam mê những tác phẩm kinh điển trong quá khứ, vẫn có những bài bình luận với hạng mục Phim Kinh Điển.",
  "Đối với những ai có hứng thú tìm hiểu đời tư của các minh tinh hạng A, Cinema cũng luôn cập nhật các tin tức nóng hổi từ họ. Bên cạnh đó còn bao gồm các bài phân tích mang tính chuyên môn, các chủ đề giúp nâng cao kiến thức điện ảnh cũng được giới thiệu qua loạt bài Ký Sự Điện Ảnh.",
  "Cinema – rạp chiếu được trang bị hệ thống âm thanh và hình ảnh hàng đầu Việt Nam, tự hào là Trạm Điện Ảnh sẵn sàng đưa bạn vào thế giới Phim Như Sống – Sống Như Phim, cùng những chuyến tàu với trải nghiệm thú vị tuyệt vời nhất trên màn ảnh.",
];

const DescriptionCinematic = () => {
  return (
    <div className="mt-10 w-main mx-auto pb-[50px]">
      <MenuTitle title={"GALAXY CINEMA"} />

      <ul className="mt-6">
        {data.map((item, index) => (
          <li key={index} className="text-[14px] text-normal mt-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DescriptionCinematic;

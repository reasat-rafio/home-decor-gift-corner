// @ts-ignore
import BlockContent from "@sanity/block-content-to-react";

export const typesSerializer = {
  block: (p: any) => {
    const { style } = p.node;

    if (style === "h3") {
      return (
        <div className="text-xl xl:text-[26px] leading-almost-relaxed  font-semibold ">
          {p.children}
        </div>
      );
    } else if (style === "blockquote") {
      return (
        <div className="text-[24px] text-white leading-[34px] font-bold">
          {p.children}
        </div>
      );
    } else if (style === "h5") {
      <div className="text-[#FEF9EF]">{p.children}</div>;
    }
    return BlockContent.defaultSerializers.types.block(p);
  },
};

export const marksSerializer = {
  fontSize: ({ children, mark }: { children: any[]; mark: any }) => (
    <span style={{ fontSize: `${mark.size}px` }}>{children}</span>
  ),
};

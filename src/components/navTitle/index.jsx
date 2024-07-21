import './index.less'

export const NavTitle = (val) => {
    return (
        <div className="navWrapper">
            {val.title || "标题"}
        </div>
    )
}

import { Result, Button } from 'antd';
import { Link } from 'umi';

export default function noFound() {
    return <div style={{margin: '20px auto'}}>
        <Result
            status="404"
            title="404"
            subTitle="抱歉，当前页面不存在."
            extra={<Link to='/'><Button type="primary">去首页</Button></Link>}
        />
    </div>
}
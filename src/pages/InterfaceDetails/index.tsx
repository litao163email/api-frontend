import {
  getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,
} from '@/services/fastApi/interfaceInfoController';
import {
  PageContainer,
} from '@ant-design/pro-components';
import {Button, Card, Descriptions, Divider, Form, message} from 'antd';
import {} from 'antd/es/table/interface';
import React, {useState, useEffect} from 'react';
import {useParams} from "@@/exports";
import TextArea from 'antd/es/input/TextArea';

/**
 * 页面主入口
 * @constructor
 */
const TableList: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [invokeRes, setInvokeRes] = useState<any>();
  //调用结果的状态
  const [invokeLoading, setInvokeLoading] = useState(false);
  //使用url中的参数
  const {id} = useParams<any>();

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   * @param fields
   */
  const loadData = async () => {
    setLoading(true);
    const hide = message.loading('加载中');
    console.log("参数id是："+id)
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(id),
      });
      if (res.data) {
        setData(res.data);
        hide();
        setLoading(false);
        message.success('加载成功');
        return true;
      }
    } catch (error) {
      hide();
      message.error('加载失败');
      setLoading(false);
      return false;
    }
  };

  /**
   * @en-US  node
   * @zh-CN 发送测试
   * @param values
   */
  const onFinish = async (values :any) => {
    const hide = message.loading('加载中');
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: Number(id),
        ...values
      });
      if (res.data) {
        setInvokeRes(res.data);
        hide();
        setInvokeLoading(false);
        message.success(res.data.message);
        return true;
      }else {
        hide();
        message.error(res.message);
        setInvokeLoading(false);
      }
    } catch (error) {
      hide();
      message.error("请求异常,请稍后重试");
      setInvokeLoading(false);
      return false;
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  //三元表达式{ 如果成立 (组件1):(组件2) }
  return (
    <PageContainer>
      <Card>
        {data ? (
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
              <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
              <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            </Descriptions>)
          : (<>接口不存在</>)
        }
      </Card>
      {/*分割线*/}
      <Divider/>
      <Card>
        <Form
          name="invoke"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{maxWidth: 600}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/*参数框*/}
          <Form.Item
            label="请求参数"
            name="userRequestParams"
            rules={[{required: true, message: '请输入你的请求参数'}]}
          >
            <TextArea rows={5}/>
          </Form.Item>

          {/*调用按钮*/}
          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
              测试调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/*分割线*/}
      <Divider/>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default TableList;

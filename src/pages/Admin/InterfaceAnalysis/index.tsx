import {} from 'antd/es/table/interface';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import { message} from 'antd';
import {listTopInvokeInterfaceInfoUsingGET} from '@/services/fastApi/analysisController';


/**
 * 页面主入口
 * @constructor
 */
const TableList: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  /**
   * @en-US Update node
   * @zh-CN API分析饼状图
   * @param fields
   */
  const loadData = async () => {
    const hide = message.loading('加载中');
    try {
      const res = await listTopInvokeInterfaceInfoUsingGET({});
      if (res.data) {
        setData(res.data ?? []);
        message.success('加载成功');
        hide();
        return true;
      }
    } catch (error) {
      hide();
      message.error('加载失败');
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 映射：{ value: 1048, name: 'Search Engine' },
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })

  /**
   *
   * tooltip 显示当前扇形信息
   */
  const option = {
    title : {
      text: 'API调用次数',
      subtext: '截止到当前时间为止',
      x:'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: 'API调用次数',
        type: 'pie',
        radius: [0, 250],
        center: ['50%', '50%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 8,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: chartData
      }
    ]
  };

  return (
    <ReactECharts option={option} style={{height: 600}}/>

  )
    ;
};

export default TableList;

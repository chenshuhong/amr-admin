import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { cloneDeep, last, max, isEmpty } from 'lodash';
import styles from './GridLess.less';

//分页配置
const pageConfig = {
  pageSizeOptions: ['10', '20', '30', '40'],
  defaultPageSize: 10
};

/**
 * 页码控制
 * pageChange, total, pageNum, pageSize
 */
const pagination = ({ pageChange, total, pageNum, pageSize, paginationProps = {} }) => {
  const { pageSizeOptions, defaultPageSize } = pageConfig;
  return {
    showTotal: total => `共 ${total} 条`,
    total,
    onChange: (pageNum, pageSize) => pageChange(pageNum, pageSize),
    pageSizeOptions,
    onShowSizeChange: (pageNum, pageSize) => pageChange(pageNum, pageSize),
    showSizeChanger: true,
    showQuickJumper: true,
    current: Number(pageNum),
    pageSize: Number(pageSize),
    hideOnSinglePage: true,
    ...paginationProps
  }
}

/**
 * 表格控件
 * columns中添加isActions标明是否操作栏
 */
class TableComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actionsWidth: 0,   //操作栏宽度
    }
    this.id = Math.random().toString(36).substr(2, 10);
  }

  componentDidMount() {
    //计算操作栏宽度
    this.calActionsWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.dataSource !== this.props.data.dataSource) {
      //计算操作栏宽度
      this.calActionsWidth();
    }
  }

  //计算操作栏宽度
  calActionsWidth = () => {
    let columns = this.props.data.columns;
    let lastColumn = last(columns) || {};
    if (lastColumn.isActions && lastColumn.hasOwnProperty('fixed')) {
      let tableNode = document.getElementById(this.id);
      let thNode = tableNode.querySelector('th:last-child .ant-table-header-column:last-child');
      let operaNodes = tableNode.querySelectorAll('.tableActions');
      if (!isEmpty(operaNodes)) {
        let widthList = Array.from(operaNodes).map(o => o.offsetWidth);
        let maxWidth = max(widthList);
        let actionsWidth = thNode.offsetWidth > maxWidth ? (thNode.offsetWidth + 40) : (maxWidth + 40)
        this.setState({
          actionsWidth: actionsWidth
        })
      } else {
        if (thNode) {
          this.setState({
            actionsWidth: thNode.offsetWidth + 40
          })
        }
      }
    }
  }

  //获取rowKey
  getRowKey = (record, index) => {
    if (record.id) {
      return record.id;
    } else {
      return `row${index}`;
    }
  }

  //处理最后一栏
  handleLastCol = (copyColumns) => {
    //判断是否有操作栏isActions
    let lastColumn = last(copyColumns) || {};
    if (!lastColumn.align) {
      lastColumn.align = 'right';
    }
    if(!lastColumn.className) {
      lastColumn.className = styles.lastColumns;
    }
    if (lastColumn.isActions && lastColumn.hasOwnProperty('fixed')) {
      if (!lastColumn.width) {
        lastColumn.width = this.state.actionsWidth;
      }
      if (lastColumn.render) {
        let fnRender = lastColumn.render;
        lastColumn.render = (text, record, index) => {
          return (
            <div className="tableActions">
              {fnRender(text, record, index)}
            </div>
          )
        }
      } else {
        lastColumn.render = (text, record, index) => {
          return (
            <div className="tableActions">{text}</div>
          )
        }
      }
    }
  }

  render() {
    let {
      pageChange,
      scroll,
      cardExtra,
      data,
      rowSelection,
      isDisplayOrder,
      paginationProps,
      className,
      ...restProps
    } = this.props;
    const { dataSource, columns, total = 0, pageNum = 1, pageSize = 10 } = data;
    let copyColumns = cloneDeep(columns);

    this.handleLastCol(copyColumns);

    //过滤所有空值的展示
    for (let item of copyColumns) {
      if (!item.render) {
        item.render = (text) => {
          if (!text && text !== 0) {
            return '-';
          } else {
            return text;
          }
        }
      }
    }

    //是否展示序列
    isDisplayOrder && copyColumns.unshift({
      title: '序号',
      dataIndex: 'commonOrder',
      key: 'commonOrder',
      render: (data, record, index) => {
        return (pageNum - 1) * pageSize + index + 1;
      }
    });

    return (
      <Table
        id={this.id}
        className={`${styles.grid} ${className}`}
        rowKey={this.getRowKey}
        dataSource={dataSource}
        columns={copyColumns}
        scroll={scroll}
        rowSelection={rowSelection}
        pagination={pageChange ? pagination({ pageChange, total, pageNum, pageSize, paginationProps }) : false}
        {...restProps}
      />
    );
  }
}

TableComponent.propTypes = {
  pageChange: PropTypes.func || PropTypes.bool,
  data: PropTypes.object.isRequired,
  selectedRowKeys: PropTypes.array,
  isDisplayOrder: PropTypes.bool      //展示序列
}

export default TableComponent;

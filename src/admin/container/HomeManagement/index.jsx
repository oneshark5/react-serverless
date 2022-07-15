import { Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import { parseJsonByString } from '../../../common/utils';
import request from '../../../common/request'
import { useSchemaData } from '../../hook/useSchemaData';

const HomeManagement = () => {
  const { schema, changeSchema } = useSchemaData()
  const handleSaveBtnClick = () => {
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4',
      },
    }).then(() => { })
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      data && changeSchema(parseJsonByString(data[0].schema))
    })
  }

  return (
    <div>
      <AreaList />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSaveBtnClick}>
          保存区块配置
        </Button>
        <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>
          重置区块配置
        </Button>
      </div>
    </div>
  );
};

export default HomeManagement
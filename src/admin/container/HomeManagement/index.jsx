
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import styles from './style.module.scss'
import AreaList from './components/AreaList';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction } from '../../store/action';
import axios from 'axios';

// store中存取数据（把使用store的逻辑放在一起）
const useStore = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  return { schema, changeSchema }
}

const HomeManagement = () => {
  const { schema, changeSchema } = useStore()
  const handleSaveBtnClick = () => {
    axios.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    }).then(() => {})
  }
  // 要重置的是children
  // 改变props，子组件跟着渲染就可以
  const handleResetBtnClick = () => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
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
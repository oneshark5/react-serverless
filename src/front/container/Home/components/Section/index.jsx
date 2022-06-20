import React from 'react'
import dayjs from 'dayjs'
import Card from './Card'
import styles from './style.module.scss'


const Section = ({ schema }) => {
  // 从后台获取属性
  const { children = [] } = schema

  return (
    <div className={styles.main}>
      <div className={styles.center}>

        <div className={styles.section} >
          {
            children.map((item, index) => {
              const { attributes = {} } = item
              const { title, description, tags, createTime, link } = attributes
              return (
                <Card className={styles.card} key={index}>
                  <div className={styles.title}>{title}</div>
                  <p className={styles.description}>{description}</p>
                  <div className={styles.info}>
                    <span className={styles.date}>{dayjs(createTime).format('YYYY-MM-DD')}</span>
                    <span className={styles.tags}>{tags}</span>
                    <div>

                    </div>
                  </div>

                </Card>
              )
            })
          }


          {/* <>
        <div className='title'>{title}</div>
        <p className='description'>
          {description}
        </p>
        <div className='info'>
          <span className='date'>{dayjs(createTime).format('YYYY-MM-DD')}</span>
          <div className='tags'>
            {
              tags.map(tag => <span className='tag' key={tag}>
                {tag}
              </span> )
            }
          </div>
        </div>
      </> */}
          {/* {
          children.map((item, index) => {
            const { attributes = {} } = item;
            const { title, description, tags, createTime, link } = attributes;
            return (
              <PostCard key={index} title={title}
                description={description} tags={tags} createTime={createTime} link={link}
              >
              </PostCard>
            )
          })
        } */}

          {/* {
          children.map((item, index) => {
            const { attributes = {} } = item
            const { title, description, tags, createTime, link } = attributes
            return (
              <li className={styles.item} key={index}>
                <a className={styles.link} href={link} target="_blank" rel='noreferrer'>
                  <h4 className={styles.title}>{title || '暂无标题'}</h4>
                  <p className={styles.desc}>{description || '暂无描述'}</p>
                  <div>
                    <p className={styles.tags}>{tags || 'Web'}</p>
                    <p className={styles.createTime}>{createTime || 'Web'}</p>
                  </div>
                </a>
              </li>
            )
          })
        } */}
        </div>
      </div>
    </div>
  )
}
export default Section
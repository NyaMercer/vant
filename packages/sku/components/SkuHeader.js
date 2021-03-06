import { use } from '../../utils';
import { inherit } from '../../utils/functional';
import Icon from '../../icon';

const [sfc, bem] = use('sku-header');

function getSkuImg(sku, selectedSku) {
  const id = selectedSku.s1;

  if (id) {
    // skuImg 挂载在 skuTree 中 s1 上
    const treeItem = sku.tree.filter(item => item.k_s === 's1')[0] || {};
    if (treeItem.v) {
      const matchedSku = treeItem.v.filter(skuValue => skuValue.id === id)[0];
      if (matchedSku) {
        return matchedSku.imgUrl || matchedSku.img_url;
      }
    }
  }
}

function SkuHeader(h, props, slots, ctx) {
  const { sku, goods, skuEventBus, selectedSku } = props;
  const goodsImg = getSkuImg(sku, selectedSku) || goods.picture;

  const previewImage = () => {
    skuEventBus.$emit('sku:previewImage', goodsImg);
  };

  return (
    <div class={[bem(), 'van-hairline--bottom']} {...inherit(ctx)}>
      <div class={bem('img-wrap')} onClick={previewImage}>
        <img src={goodsImg} />
      </div>
      <div class={bem('goods-info')}>
        <div class="van-sku__goods-name van-ellipsis">{goods.title}</div>
        {slots.default && slots.default()}
        <Icon
          name="close"
          class="van-sku__close-icon"
          onClick={() => {
            skuEventBus.$emit('sku:close');
          }}
        />
      </div>
    </div>
  );
}

SkuHeader.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object
};

export default sfc(SkuHeader);

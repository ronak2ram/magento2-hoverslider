<?php

namespace Ronak\HoverSlider\Plugin;

class ToHtmlAfter
{

    /**
     * ToHtmlAfter constructor.
     * @param \Magento\Catalog\Helper\Image $imageHelper
     * @param \Magento\Catalog\Model\ProductFactory $_productFactory
     * @param array $data
     */
    public function __construct(
        \Magento\Catalog\Helper\Image $imageHelper,
        \Magento\Catalog\Model\ProductFactory $_productFactory,
        array $data = []
    ) {
        $this->imageHelper = $imageHelper;
        $this->_productFactory = $_productFactory;
    }
    public function afterToHtml(\Magento\Catalog\Block\Product\Image $subject, $result)
    {
        $product_data = $this->_productFactory->create()->load($subject->getProductId());
        $images = $product_data->getMediaGalleryImages();
        $baseHoverImage = [];
        foreach($images as $child){
            $hoverImage = $this->imageHelper->init($product_data, 'category_page_grid_hover')
                ->setImageFile($child->getFile())
                ->getUrl();
            $baseHoverImage[] = $hoverImage;
        }
        return $result .'<span class="product-images" all-media=\''.json_encode($baseHoverImage) .'\'></span>';

    }
}

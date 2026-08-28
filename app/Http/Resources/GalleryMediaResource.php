<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryMediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'category'      => $this->category,
            'type'          => $this->type,
            'src'           => $this->src,
            'thumbnail_src' => $this->thumbnail_src,
            'title'         => $this->title,
            'caption'       => $this->caption,
            'is_active'     => $this->is_active,
        ];
    }
}

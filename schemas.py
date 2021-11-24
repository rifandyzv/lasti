from pydantic import BaseModel

class Item(BaseModel):
    id: int
    produk: str
    harga: int
from typing import List
from fastapi import Depends, FastAPI, HTTPException
import mysql.connector
import schemas

app = FastAPI()

db = mysql.connector.connect(
    user='root', 
    password='asd', 
    host='localhost', 
    port=8888,
    database='lasti',
    auth_plugin='caching_sha2_password')

cursor = db.cursor()


@app.post("/item")
async def add_item(item: schemas.Item):
    if db.is_connected(): 
        cursor.execute("SELECT * FROM products WHERE id = %(item_id)s", {"item_id" : item.id})
        result = cursor.fetchone()
        if result != None:
            item_id = item.id
            cursor.execute("UPDATE products SET jumlah = jumlah + 1 WHERE id = %(item_id)s", {"item_id" : item.id})
            db.commit()
            return {"message": "Jumlah item berhasil ditambahkan!"}
        else:
            # item not found
            values = (item.id, item.produk, item.harga)
            cursor.execute("INSERT INTO products VALUES (%s, %s, %s, 1)", values)
            db.commit()
            return {"message": "Item baru berhasil ditambahkan!"}
    else:
        raise HTTPException(
            status_code=404, detail='There is a problem!')

@app.patch("/update-item/{item_id}")
async def update_item(item_id: int, jumlah: int):
    if db.is_connected():
        cursor.execute("SELECT * FROM products WHERE id = %(item_id)s", {"item_id" : item_id})
        result = cursor.fetchone()
        if result != None:
            jumlah_db = result[3]
            if jumlah_db >= jumlah:
                if (jumlah_db - jumlah) > 0 :
                    cursor.execute("UPDATE products SET jumlah = jumlah - %(jumlah)s WHERE id = %(item_id)s", {"jumlah": jumlah, "item_id" : item_id})
                else:
                    cursor.execute("DELETE FROM products WHERE id =%(item_id)s", {"item_id" : item_id})
                db.commit()
                return {"message": "item berhasil dikurangi!"}
            else:
                return {"message": "jumlah item lebih sedikit dibandingkan yang ingin dikurangi"}
        else:
            return {"message": "Item not found!"}
    else:
        raise HTTPException(
            status_code=404, detail='There is a problem!')


@app.delete("/delete/")
async def delete_item(item_id: int):
    if db.is_connected():
        cursor.execute("SELECT * FROM products WHERE id = %(item_id)s", {"item_id" : item_id})
        result = cursor.fetchone()
        if result != None:
            cursor.execute("DELETE FROM products WHERE id =%(item_id)s", {"item_id" : item_id})
            db.commit()
            return {"message": "Item berhasil dihapus!"}
        else:
            return {"message": "Item doesn't exist!"}
    else:
        raise HTTPException(
            status_code=404, detail='There is a problem!')

        


